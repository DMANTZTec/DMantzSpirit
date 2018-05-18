import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MyworkService {
  public myworkdata1;
  public employeedetails;
  public subjectdetails;
  public topicdetails;
  public selectColumns={};
  constructor(private _http: Http) {
  }
  getMyworkData() {
    return this._http.get('http://localhost:3000/api/mywork')
      .map((res) => {
        this.myworkdata1=res.json();
        console.log(this.myworkdata1);
        return res.json();
      });
  }
  settopicdetails(value){
    this.topicdetails=value;
    console.log(this.topicdetails);
}
  setemployeedetails(value){
    this.employeedetails=value;
    console.log(this.employeedetails);
  }
  setsubjectdetails(value){
    this.subjectdetails=value;
    console.log(this.subjectdetails);
  }
  setselectColumns(value){
    this.selectColumns=value;
    console.log(this.selectColumns);
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
    var data= { editdetails: editmywork, currentdetails: currentmyworkdata};
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/updatemywork', data, {headers: headers})
      .map(res => res.json());
  }
  gettopicdetails()
  {
    return this._http.get('http://localhost:3000/api/topictabledetails')
      .map(res => res.json());
  }
  getemployeedetails()
  {
    return this._http.get('http://localhost:3000/api/employeetabledetails')
      .map(res => res.json());
  }
  getsubjectdetails()
  {
    return this._http.get('http://localhost:3000/api/subjecttabledetails')
      .map(res => res.json());
  }
  /*FilteringMyworkType() {
    var headers = new Headers();
    var data= { editdetails: editmywork, currentdetails: currentmyworkdata};
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/updatemywork', data, {headers: headers})
      .map(res => res.json());
  }*/
}
