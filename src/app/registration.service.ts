import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = 'http://localhost:3000/submitRar';

  constructor(private _http : HttpClient) { }

  submitRar(userData)
  {
    return this._http.post<any>(this._url,userData);
  }
}
