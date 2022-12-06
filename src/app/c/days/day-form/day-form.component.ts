import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, take, tap } from 'rxjs';
import { Day, Day_Post } from 'src/app/models/Day';
import { DaySection, DaySection_Post } from 'src/app/models/DaySection';
import { Dish } from 'src/app/models/Dish';
import { Item } from 'src/app/models/Item';
import { Itemable_Post } from 'src/app/models/Itemable';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-day-form',
  templateUrl: './day-form.component.html',
  styleUrls: ['./day-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayFormComponent implements OnInit, OnDestroy {
  private _sections = new BehaviorSubject<DaySection[]>([])
  sections$ = this._sections.asObservable()
    // .pipe(tap(sections => {
    //   console.log(sections)
    //   console.log(this.sectionsControls.getRawValue())      
    // }))

  dayId?: number
  dayName?: string

  preloadedDishesIndex!: Dish[]
  preloadedItemsIndex!: Item[]
  preloadedUnits!: MeasurementUnit[]

  private nameValidators = [Validators.required, Validators.maxLength(25)]
  form = new FormGroup({
    name: new FormControl('', this.nameValidators),
    sectionNames: new FormArray<FormControl<any>>([])
  })
  get name() { return this.form.controls.name }
  get sectionsControls() { return this.form.controls.sectionNames }

  showSpinner: boolean = false
  showConfirmDeleteDayModal: boolean = false

  private actionSubs?: Subscription
  private deleteSubs?: Subscription
  private DishesSubs!: Subscription
  private ItemsSubs!: Subscription
  private UnitsSubs!: Subscription

  constructor(
    private _route: ActivatedRoute, 
    private _appS: AppService, 
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _toastS: ToastService,
  ) { }

  submit() {
    this.showSpinner = true
    this.form.markAsPending()

    const sections_component = this._sections.getValue()
    
    const sections_post: DaySection_Post[] = sections_component.map((section, i) => {
      const name = this.sectionsControls.at(i).value ?? ''
      const dishes = section.dishes.map(({id}) => id)
      const items = section.items.map((item):Itemable_Post => {
        return {
          item_id: item.id,
          quantity: item.pivot!.quantity,
          measurement_unit_id: item.pivot!.measurement_unit.id
        }
      })

      return new DaySection_Post(name, dishes, items)
    })

    const data: Day_Post = new Day_Post(this.name.value??'', sections_post)

    let action: Observable<any>
    if(this.dayId) {
      action = this._appS.day_update(this.dayId, data)
    } else {
      action = this._appS.day_store(data)
    }

    this.actionSubs = action.subscribe({
      next: () => {
        this._router.navigate(['/'])
        this._toastS.createToast({
          message: this.dayId ? 'Día actualizado' : 'Día creado',
          type: 'success'
        })
      },
      error: error => {
        this.showSpinner = false

        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(responseErrors) {
          for(let error in responseErrors) {          
            const control = this.form.get(error)
            control?.setErrors({serverErrorMessage: responseErrors[error][0]})
            control?.markAsTouched()
          }          
        }

        this._cd.detectChanges()
      }
    })
  }

  deleteDay() {
    this.deleteSubs = this._appS.day_delete(this.dayId!).subscribe(() => this._router.navigate(['/']))
  }

  createSection() {
    this.addControl()
    const currentSections = this._sections.getValue()
    this._sections.next( [new DaySection(''), ...currentSections])
  }
  updateSection(updatedSection: DaySection, index: number) {
    this.form.updateValueAndValidity()
    const currentSections = this._sections.getValue()
    currentSections[index] = updatedSection
    this._sections.next(currentSections)
  }
  deleteSection(index: number) {
    this.removeControl(index)    
    const currentSections = this._sections.getValue()
    this._sections.next(currentSections.filter((section, i) => index !== i))
  }

  private addControl(value:string = ''): void {
    this.sectionsControls.insert(0, new FormControl(value, this.nameValidators))
  }
  private removeControl(atIndex: number): void {    
    this.sectionsControls.removeAt(atIndex)
  }  
  getControl(index: number) {
    return this.sectionsControls.at(index) as FormControl
  }

  ngOnInit(): void {
    this._route.data.pipe(take(1)).subscribe(data => {        
      const day: Day | undefined = data['day']
      if(day) {
        this.name.setValue(day.name)
        this.dayId = day.id
        this.dayName = day.name
        
        const sections = day.day_sections
        if(sections.length > 0) {
          this._sections.next(sections)
          sections.forEach(({name}) => this.sectionsControls.push(new FormControl(name, this.nameValidators)))
        }
      }
    })

    this.DishesSubs = this._appS.dish_index().subscribe(dishes => this.preloadedDishesIndex = dishes)
    this.ItemsSubs = this._appS.item_index().subscribe(items => this.preloadedItemsIndex = items)
    this.UnitsSubs = this._appS.measurementUnit_index().subscribe(units => this.preloadedUnits = units)
  }

  ngOnDestroy(): void {
    this.actionSubs?.unsubscribe()
    this.deleteSubs?.unsubscribe()
    this.DishesSubs.unsubscribe()
    this.ItemsSubs.unsubscribe()
    this.UnitsSubs.unsubscribe()
  }
}