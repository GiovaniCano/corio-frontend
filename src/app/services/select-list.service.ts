import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sortObjectsArray } from 'src/app/helpers';
import { ListLite } from 'src/app/models/List';

@Injectable({
  providedIn: 'root'
})
export class SelectListService {
  private _lists = new BehaviorSubject<ListLite[]>([])
  lists$ = this._lists.asObservable()
  private get currentLists() { return this._lists.getValue() }

  constructor() { }

  pushLists(lists: ListLite[]): void {
    this._lists.next(lists)
  }

  addList(list: ListLite): void {
    this._lists.next(sortObjectsArray([...this.currentLists, list], 'name'))
  }

  updateList(updatedList: ListLite): void {
    this._lists.next(this.currentLists.map(list => list.id == updatedList.id ? updatedList : list))
  }

  removeList(id: number): void {
    this._lists.next(this.currentLists.filter(list => list.id !== id))
  }
}
