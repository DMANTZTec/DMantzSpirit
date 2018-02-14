import { Component, OnInit } from '@angular/core';
import {MyworkService} from './mywork.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DropdownModule} from "ngx-dropdown";
import { Router }  from '@angular/router';

import {Mywork} from "./mywork";
import {document} from "@angular/platform-browser/src/facade/browser";

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.css']
})
export class MyworkComponent implements OnInit
{
  private myworkdata;
  private currentmyworkdata;
  createForm: FormGroup;
  projectForm: FormGroup;
  private form;
  private newmywork: Mywork[];
  private sess=localStorage.getItem('sess1');
  private columns=["MYWORK_TYPE","EMPLOYEE_NM","SUBJECT_NM","TOPIC_ID","TOPIC_NM",
    "TOPIC_START_DT","TOPIC_END_DT","ESTIMATED_TIME","ACTUAL_TIME",""];

  constructor(private _myworkService: MyworkService,private formBuilder:FormBuilder,private _router: Router) {  }
  Logout()
  {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
  Login()
  {
    this._router.navigate(['/login']);
  }
AddNewMyworkData(value)
{
  this.form = value;
  console.log(this.form);
  var createmywork = this.form;
  console.log(createmywork);
  this._myworkService.AddNewMyworkData(createmywork).subscribe(data => {
    console.log(data);
    this.ngOnInit();
  });
}
ShowTopicForm()
{
  if ( document.getElementById('update').style.display == 'block')
  {
    document.getElementById('update').style.display = 'none';
  }
  this.createForm.enable();
  this.createForm.reset();
  document.getElementById('create').style.display = 'block';
}
ShowProjectForm()
{
var modal_projecttask=document.getElementById('modal_projecttask');
var close = document.getElementsByClassName("close")[0];
    modal_projecttask.style.display = "block";
  close.onclick = function() {
    modal_projecttask.style.display = "none";
  };
}

edit(data)
{
  if ( document.getElementById('create').style.display == 'block')
  {
    document.getElementById('create').style.display = 'none';
  }
  this.createForm.enable();
  this.currentmyworkdata = data;
  console.log(this.currentmyworkdata);
  console.log(data);
  document.getElementById('update').style.display='block';
  this.createForm.controls['EMPLOYEE_NM'].setValue(data.EMPLOYEE_NM);
  //document.getElementById('EMPLOYEE_NM').innerHTML=data.EMPLOYEE_NM;
  this.createForm.controls['SUBJECT_NM'].setValue(data.SUBJECT_NM);
  this.createForm.controls['TOPIC_ID'].setValue(data.TOPIC_ID);
  this.createForm.controls['TOPIC_NM'].setValue(data.TOPIC_NM);
  this.createForm.controls['TOPIC_START_DT'].setValue(data.TOPIC_START_DT);
  this.createForm.controls['TOPIC_END_DT'].setValue(data.TOPIC_END_DT);
  this.createForm.controls['ESTIMATED_TIME'].setValue(data.ESTIMATED_TIME);
  this.createForm.controls['ACTUAL_TIME'].setValue(data.ACTUAL_TIME);
}

UpdateMyworkData()
{
  var editmywork = this.createForm.value;
  console.log(editmywork);
  this._myworkService.UpdateMyworkData(editmywork, this.currentmyworkdata).subscribe(data => {
    console.log(data);
    this.ngOnInit();
  });
}
view(data)
{
    this.currentmyworkdata = data;
    console.log(data);
    this.createForm.disable();
    this.createForm.controls['EMPLOYEE_NM'].setValue(data.EMPLOYEE_NM);
    //document.getElementById('EMPLOYEE_NM').innerHTML=data.EMPLOYEE_NM;
  this.createForm.controls['SUBJECT_NM'].setValue(data.SUBJECT_NM);
  this.createForm.controls['TOPIC_ID'].setValue(data.TOPIC_ID);
  this.createForm.controls['TOPIC_NM'].setValue(data.TOPIC_NM);
  this.createForm.controls['TOPIC_START_DT'].setValue(data.TOPIC_START_DT);
  this.createForm.controls['TOPIC_END_DT'].setValue(data.TOPIC_END_DT);
  this.createForm.controls['ESTIMATED_TIME'].setValue(data.ESTIMATED_TIME);
  this.createForm.controls['ACTUAL_TIME'].setValue(data.ACTUAL_TIME);
}
  ngOnInit()
  {
    this._myworkService. getMyworkData()
      .subscribe(myworkdata => {
        this . myworkdata = myworkdata;
        this.view(myworkdata[0]);
      });
    this.createForm = this.formBuilder.group({
      EMPLOYEE_NM:[''],
      SUBJECT_NM:[''],
      TOPIC_ID:[''],
      TOPIC_NM:[''],
      TOPIC_START_DT:[''],
      TOPIC_END_DT:[''],
      ESTIMATED_TIME:[''],
      ACTUAL_TIME:['']
    });
    this.projectForm = this.formBuilder.group({
      EMPLOYEE_NM:[''],
      PROJECT_NM:[''],
      TASK_ID:[''],
      TASK_NM:[''],
      TASK_START_DT:[''],
      TASK_END_DT:[''],
      ESTIMATED_TIME:[''],
      ACTUAL_TIME:['']
    });
  }

}
