import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from '../models/Day';
import { Dish, Dish_Post } from '../models/Dish';
import { Item, Item_Post } from '../models/Item';
import { List } from '../models/List';
import { MeasurementType } from '../models/MeasurementType';
import { MeasurementUnit } from '../models/MeasurementUnit';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  /* DISHES */
  dish_store(body: Dish_Post): Observable<any> { 
    const url = this.url('dish')
    return this._http.post<any>(url, body)
  }
  dish_update(id:number, body: Dish_Post): Observable<any> {
    const url = this.url('dish/' + id)
    return this._http.put<any>(url, body)
  }
  dish_delete(id: number): Observable<null> {
    const url = this.url('dish/' + id)
    return this._http.delete<null>(url)
  }
  dish_show(id: number): Observable<Dish> {
    const url = this.url('dish/'+id)
    return this._http.get<Dish>(url)
  }
  dish_index(): Observable<Dish[]> {
    const url = this.url('dish')
    return this._http.get<Dish[]>(url)
  }

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
  day_index(): Observable<Day[]> {
    const url = this.url('day')
    return this._http.get<Day[]>(url)
  }
  measurementType_index(): Observable<MeasurementType[]> {
    // Is not necessary to use the server to get 3 constants at the moment
    const types: MeasurementType[] = [
      {id: 1, name: 'Peso'},
      {id: 2, name: 'Volumen'},
      {id: 3, name: 'Unidad'},
    ]
    return of<MeasurementType[]>(types)
  }

  //////////////////
  private url(endpoint: string): string {
    return environment.API_URL + endpoint
  }
}
