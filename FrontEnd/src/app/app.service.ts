import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  public userdetails;
  constructor(private _http: Http) {
    console.log(this.userdetails);
    if(sessionStorage){
      this.userdetails=this.userdetails;
    }
  }
}
