import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from '../models/Day';
import { Dish } from '../models/Dish';
import { Item, Item_Post } from '../models/Item';
import { List } from '../models/List';
import { MeasurementUnit } from '../models/MeasurementUnit';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  /* ITEMS */
  item_update(id:number, item: Item_Post): Observable<Item> { // items
    const url = this.url('item/' + id)
    return this._http.put<Item>(url, item)
  }
  item_delete(id: number): Observable<null> { // items
    const url = this.url('item/' + id)
    return this._http.delete<null>(url)
  }
  item_store(item: Item_Post): Observable<Item> { // items, dishes, daysections, lists
    const url = this.url('item')
    return this._http.post<Item>(url, item)
  }
  item_index(): Observable<Item[]> { // items, dishes, daysections, lists
    const url = this.url('item')
    return this._http.get<Item[]>(url)
  }

  /* INDEX */
  list_index(): Observable<List[]> {
    const url = this.url('list')
    return this._http.get<List[]>(url)
  }
  measurementUnit_index(): Observable<MeasurementUnit[]> {
    const url = this.url('measurement-unit')
    return this._http.get<MeasurementUnit[]>(url)
  }
  dish_index(): Observable<Dish[]> {
    const url = this.url('dish')
    return this._http.get<Dish[]>(url)
  }  
  day_index(): Observable<Day[]> {
    const url = this.url('day')
    return this._http.get<Day[]>(url)
  }

  private url(endpoint: string): string {
    return environment.API_URL + endpoint
  }
}
