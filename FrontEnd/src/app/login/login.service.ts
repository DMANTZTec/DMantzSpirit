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
  CheckSecurityAnswer(formdetails)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/checksecurityanswer', formdetails, {headers: headers})
      .map(res => res.json());
  }
  CheckEmail(formdetails){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/checkemail', formdetails, {headers: headers})
      .map(res => res.json());
  }
ResetPassword(details){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/resetpassword', details, {headers: headers})
      .map(res => res.json());
  }

}
