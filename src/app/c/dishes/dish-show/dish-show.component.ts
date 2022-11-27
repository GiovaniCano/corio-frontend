import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';

@Component({
  selector: 'app-dish-show',
  templateUrl: './dish-show.component.html',
  styleUrls: ['./dish-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishShowComponent implements OnInit {

  @Input() dish!: Dish
  @Input() editBtn: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
