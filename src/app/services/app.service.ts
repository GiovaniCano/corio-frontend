import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from '../models/Day';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }

  day_index(): Observable<Day[]> {
    const url = this.url('day')
    return this._http.get<Day[]>(url)
  }

  private url(endpoint: string): string {
    return environment.API_URL + endpoint
  }
}
