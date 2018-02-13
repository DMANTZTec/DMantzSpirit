import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {MyworkDetail} from './MyworkDetail';

@Injectable()
export class MyworkService {
  constructor(private _http: Http) {
  }

  getMyworkData() {
    return this._http.get('http://localhost:3000/api/mywork')
      .map(res => res.json());
  }

  AddNewMyworkData(createmywork) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/insertmywork', createmywork, {headers: headers})
      .map(res => res.json());
  }

  UpdateMyworkData(editmywork,currentmyworkdata)
  {
    var headers = new Headers();
    var data={editdetails:editmywork,currentdetails:currentmyworkdata};
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/updatemywork', data, {headers: headers})
      .map(res => res.json());
  }
}

