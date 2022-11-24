import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorioService {

  constructor(private _http: HttpClient) { }

  private url(endpoint: string): string {
    return environment.API_URL + endpoint
  }
}
