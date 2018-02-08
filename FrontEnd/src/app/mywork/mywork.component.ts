import { Component, OnInit } from '@angular/core';
import {MyworkService} from './mywork.service';

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.css']
})
export class MyworkComponent implements OnInit
{
  private myworkdata;
  private columns=["EMPLOYEE_NM","SUBJECT_NM","TOPIC_ID","TOPIC_NM","TOPIC_START_DT","TOPIC_END_DT","ESTIMATED_TIME","ACTUAL_TIME"];
  constructor(private _myworkService: MyworkService) { }

  ngOnInit()
  {
    this._myworkService. getMyworkData()
      .subscribe(myworkdata => this . myworkdata = myworkdata);
  }

}
