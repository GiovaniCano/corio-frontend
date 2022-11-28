import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from '../models/Day';
import { Dish } from '../models/Dish';
import { Item } from '../models/Item';
import { MeasurementUnit } from '../models/MeasurementUnit';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  measurementUnit_index(): Observable<MeasurementUnit[]> {
    const url = this.url('measurement-unit')
    return this._http.get<MeasurementUnit[]>(url)
  }
  item_index(): Observable<Item[]> {
    const url = this.url('item')
    return this._http.get<Item[]>(url)
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
