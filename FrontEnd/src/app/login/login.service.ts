import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {LoginDetail} from './loginDetail';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  checkLoginDetails(loginDetails)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/login', loginDetails, {headers: headers})
      .map(res => res.json());
  }

}

