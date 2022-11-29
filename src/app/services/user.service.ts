import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Avatar } from '../models/_types';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  avatars(): Observable<Avatar[]> {
    const url = this.url('avatars')
    return this._http.get<Avatar[]>(url)
  }

  private url(endpoint: string): string {
    return environment.API_URL + endpoint
  }
}
