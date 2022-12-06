import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Dish } from 'src/app/models/Dish';

@Component({
  selector: 'app-dish-show',
  templateUrl: './dish-show.component.html',
  styleUrls: ['./dish-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishShowComponent {
  @Input() dish!: Dish
  @Input() editBtn: boolean = false
  @Input() noAddBtn: boolean = false

  @Output() deleteClicked = new EventEmitter<number>()

  constructor() { }

  onDeleteClicked() {
    this.deleteClicked.emit(this.dish.id)
  }
}
