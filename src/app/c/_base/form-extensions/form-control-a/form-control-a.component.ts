import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as formErrors from '../form-errors.json';

@Component({
  selector: 'app-form-control-a',
  templateUrl: './form-control-a.component.html',
  styleUrls: ['./form-control-a.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormControlAComponent }
  ]
})
export class FormControlAComponent implements ControlValueAccessor, AfterViewInit {
  @Input() control!: AbstractControl
  @Input() formControlName!: string
  @Input() idFor?: string
  @Input() type!: string
  @Input() label!: string
  @Input() placeholder!: string
  @Input() autocomplete: 'on'|'off' = 'off'

  @ViewChild('formInput') formInput!: ElementRef

  value!: string
  private _onChange!: Function
  private _onTouched!: Function
  private _disabled!: boolean

  get isInvalid(): boolean { return this.control.invalid && (this.control.dirty || this.control.touched) }
  get currentError(): string { return this.control.errors ? Object.keys(this.control.errors)[0] : '' }

  get errorMessage():string { 
    if(this.currentError === 'serverErrorMessage') {
      return this.control.errors!['serverErrorMessage']
    }

    if(this.currentError === 'minlength' || this.currentError === 'maxlength') {
      const requiredLength:number = this.control.errors![this.currentError]['requiredLength']
      const actualLength:number = this.control.errors![this.currentError]['actualLength']
      
      return formErrors[this.currentError]
              .replace('{n}', requiredLength.toString())
              .replace('{n2}', actualLength.toString())
    }
    if(this.currentError === 'max' || this.currentError === 'min') {
      const requiredNumber:number = this.control.errors![this.currentError][this.currentError]
      return formErrors[this.currentError].replace('{n}', requiredNumber.toString())
    }

    return formErrors[this.currentError as keyof typeof formErrors] 
  }

  constructor(private _render: Renderer2) { }

  onFocus(event: Event) {
    (event.target as HTMLInputElement).select()
  }

  ngAfterViewInit(): void {
    this._render.setProperty(this.formInput.nativeElement, 'disabled', this._disabled)
  }

  input(event: Event): void {
    const target = event.target as HTMLInputElement
    this._onChange(target.value)
  }
  blur(event: FocusEvent): void {
    this._onTouched(event.target)
  }

  writeValue(value: string): void {
    this.value = value
  }
  registerOnChange(fn: Function): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled
  }
}
