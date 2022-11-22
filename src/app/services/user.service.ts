import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdatePasswordCredentials, UpdateProfileCredentials } from '../models/interfaces';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  private url(endpoint: string): string {
    return environment.API_URL + endpoint
  }
}
