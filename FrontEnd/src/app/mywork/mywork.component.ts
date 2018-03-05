import { Component, OnInit } from '@angular/core';
import {MyworkService} from './mywork.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';

import {Mywork} from "./mywork";
import {document} from "@angular/platform-browser/src/facade/browser";
import {AppService} from '../app.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.css']
})
export class MyworkComponent implements OnInit
{
  private myworkdata;
  private displaymyworkdata;
  private currentmyworkdata;
  private filtereddata=[];
  createForm: FormGroup;
  projectForm: FormGroup;
  viewForm:FormGroup;
  private form;
  private selectedRow;
  private myworktype=["PROJECT","TOPIC"];
  private myworkclicked;
  private toolsclicked;
  private employeedetails;
  private subjectdetails;
  private topicdetails;
  private newmywork: Mywork[];
  private sess=sessionStorage.getItem('sessionid');
  private selectColumns={myworktype:["PROJECT TASK","TOPIC"],
    employeenames:[],
    subjectnames:[],
    topicids:[],
    topicnames:[]
  };
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  private userselectedcolumns={myworktype:"PROJECT TASK",employeenames:"EMPLOYEES",subjectnames:"SUBJECTS",topicids:"TOPICIDS",topicnames:"TOPICNAMES"};
  private topics=[{tid:"T0001",tname:"HTTP Observables"},{tid:"T0002",tname:"Angular2 concepts"},{tid:"T0003",tname:"Angular2 components"}];

  constructor(private _appservice:AppService,private _myworkService: MyworkService,private formBuilder:FormBuilder,private _router: Router) {  }
onDateChanged(value){
    console.log(value);
}
getbackgroundMywork(){
    if(this.myworkclicked){
      return "lightgray";
    }
}
getbackgroundTools(){
  if(this.toolsclicked){
    return "lightgray";
  }
}
mywork()
{
  this.myworkclicked = true;
  this.toolsclicked=false;
  this.getbackgroundMywork();
  //document.getElementById("mywork").backgroundColor="violet";
  this._myworkService. getMyworkData()
    .subscribe(myworkdata => {
      this . myworkdata = myworkdata;
      console.log(this.myworkdata);
      var project=[];
      for(var i=0;i<this.myworkdata.length;i++) {
        if (this.myworkdata[i].MYWORK_TYPE == "PROJECT TASK") {
          project.push(this.myworkdata[i]);
        }
      }
      this.filtereddata=project;
      this.displaymyworkdata=project;
      console.log(project);
      this.TableRowClicked(myworkdata[0],0);
    });
}
TopicIDSelected(selectedvalue){
    console.log(selectedvalue);
    for(var i=0;i<this.topicdetails.length;i++){
      if(this.topicdetails[i].TOPIC_ID==selectedvalue)
      {
        this.createForm.controls['TOPIC_NM'].setValue(this.topicdetails[i].TOPIC_NM);
      }
    }
  }
tools()
{
  this.toolsclicked=true;
  this.myworkclicked=false;
  this.getbackgroundTools();
  console.log("tools");
}
Logout()
  {
    sessionStorage.clear();
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
  console.log(createmywork.TOPIC_START_DT.formatted);
  this._myworkService.AddNewMyworkData(createmywork).subscribe(data => {
    console.log(data);
    this.ngOnInit();
  });
}
ShowTopicForm()
{
  var modal_topictask=document.getElementById('modal_topictask');
  var close = document.getElementsByClassName("closetopictask")[0];
  modal_topictask.style.display = "block";
  close.onclick = function() {
    modal_topictask.style.display = "none";
  };
  if ( document.getElementById('update').style.display == 'block')
    document.getElementById('update').style.display = 'none';
  this.createForm.reset();
  document.getElementById('create').style.display = 'block';
  console.log(sessionStorage.getItem('sessiondetails'));
  this.createForm.controls['EMPLOYEE_NM'].setValue(sessionStorage.getItem('sessiondetails'));
}
ShowProjectForm()
{
var modal_projecttask=document.getElementById('modal_projecttask');
var close = document.getElementsByClassName("close")[0];
    modal_projecttask.style.display = "block";
  close.onclick = function() {
    modal_projecttask.style.display = "none";
  };
  if ( document.getElementById('updateproject').style.display == 'block')
    document.getElementById('updateproject').style.display = 'none';
  this.projectForm.reset();
  document.getElementById('createproject').style.display = 'block';
  console.log(sessionStorage.getItem('sessiondetails'));
  this.projectForm.controls['EMPLOYEE_NM'].setValue(sessionStorage.getItem('sessiondetails'));
}

edit(data)
{
  this.currentmyworkdata = data;
  console.log(this.currentmyworkdata);
  console.log(data);
  if(data.MYWORK_TYPE=="PROJECT TASK")
  {
    this.ShowProjectForm();
    document.getElementById('updateproject').style.display='block';
    if ( document.getElementById('createproject').style.display == 'block')
      document.getElementById('createproject').style.display = 'none';
    this.projectForm.controls['EMPLOYEE_NM'].setValue(data.EMPLOYEE_NM);
    this.projectForm.controls['PROJECT_NM'].setValue(data.SUBJECT_NM);
    this.projectForm.controls['TASK_ID'].setValue(data.TOPIC_ID);
    this.projectForm.controls['TASK_NM'].setValue(data.TOPIC_NM);
    this.projectForm.controls['TASK_START_DT'].setValue(data.TOPIC_START_DT);
    this.projectForm.controls['TASK_END_DT'].setValue(data.TOPIC_END_DT);
    this.projectForm.controls['ESTIMATED_TIME'].setValue(data.ESTIMATED_TIME);
    this.projectForm.controls['ACTUAL_TIME'].setValue(data.ACTUAL_TIME);
  }
  else {
    this.ShowTopicForm();
    document.getElementById('update').style.display='block';
    if ( document.getElementById('create').style.display == 'block')
      document.getElementById('create').style.display = 'none';
    this.createForm.controls['EMPLOYEE_NM'].setValue(data.EMPLOYEE_NM);
    this.createForm.controls['SUBJECT_NM'].setValue(data.SUBJECT_NM);
    this.createForm.controls['TOPIC_ID'].setValue(data.TOPIC_ID);
    this.createForm.controls['TOPIC_NM'].setValue(data.TOPIC_NM);
    this.createForm.controls['TOPIC_START_DT'].setValue(data.TOPIC_START_DT);
    this.createForm.controls['TOPIC_END_DT'].setValue(data.TOPIC_END_DT);
    this.createForm.controls['ESTIMATED_TIME'].setValue(data.ESTIMATED_TIME);
    this.createForm.controls['ACTUAL_TIME'].setValue(data.ACTUAL_TIME);
}
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
  this.viewForm.disable();
  this.viewForm.controls['EMPLOYEE_NM'].setValue(data.EMPLOYEE_NM);
  this.viewForm.controls['SUBJECT_NM'].setValue(data.SUBJECT_NM);
  this.viewForm.controls['TOPIC_ID'].setValue(data.TOPIC_ID);
  this.viewForm.controls['TOPIC_NM'].setValue(data.TOPIC_NM);
  this.viewForm.controls['TOPIC_START_DT'].setValue(data.TOPIC_START_DT);
  this.viewForm.controls['TOPIC_END_DT'].setValue(data.TOPIC_END_DT);
  this.viewForm.controls['ESTIMATED_TIME'].setValue(data.ESTIMATED_TIME);
  this.viewForm.controls['ACTUAL_TIME'].setValue(data.ACTUAL_TIME);
}
TableRowClicked(data,i)
{
  this.selectedRow=i;
  console.log(data);
  this.view(data);
}
FilteringMyworkType(selectedvalue)
{
  var filteredtasks=[];
  this.userselectedcolumns.myworktype = selectedvalue;
  console.log(selectedvalue);
  console.log(this.userselectedcolumns);
  for(var i=0;i<this.myworkdata.length;i++) {
    if (this.myworkdata[i].MYWORK_TYPE == this.userselectedcolumns.myworktype) {
      filteredtasks.push(this.myworkdata[i]);
    }
  }
  this.filtereddata=filteredtasks;
  this.displaymyworkdata=this.filtereddata;
  console.log(this.filtereddata);
  this.userselectedcolumns.employeenames="EMPLOYEES";
  document.getElementById('employeeselect').value="EMPLOYEES";
  document.getElementById('subjectselect').value="SUBJECTS";
}
FilteringEmployee(selectedvalue)
{
  this.userselectedcolumns.employeenames = selectedvalue;
  console.log(selectedvalue);
  var filteredtasks=[];
  if(this.userselectedcolumns.employeenames=="EMPLOYEES") {
    for (var i = 0; i < this.filtereddata.length; i++) {
      if ((this.filtereddata[i].EMPLOYEE_NM) != "") {
          filteredtasks.push(this.filtereddata[i]);
      }
    }
    this.filtereddata = filteredtasks;
    this.displaymyworkdata = this.filtereddata;
    console.log(this.filtereddata);
  }
  else{
    for (var i = 0; i < this.filtereddata.length; i++) {
      if (this.filtereddata[i].EMPLOYEE_NM == this.userselectedcolumns.employeenames) {
          filteredtasks.push(this.filtereddata[i]);
      }
    }
    this.filtereddata = filteredtasks;
    this.displaymyworkdata = this.filtereddata;
    console.log(this.filtereddata);
  }
}
FilteringSubject(selectedvalue)
{
  this.userselectedcolumns.subjectnames = selectedvalue;
  console.log(selectedvalue);
  var filteredtasks=[];
  if(this.userselectedcolumns.subjectnames=="SUBJECTS") {
    console.log(this.filtereddata);
    for (var i = 0; i < this.filtereddata.length; i++) {
      if ((this.filtereddata[i].SUBJECT_NM) != "") {
        console.log(this.filtereddata[i]);
        filteredtasks.push(this.filtereddata[i]);
      }
    }
    this.filtereddata = filteredtasks;
    this.displaymyworkdata = this.filtereddata;
    console.log(this.filtereddata);
  }
  else{
    for (var i = 0; i < this.filtereddata.length; i++) {
      if (this.filtereddata[i].SUBJECT_NM == this.userselectedcolumns.subjectnames) {
        console.log(this.filtereddata);
        filteredtasks.push(this.filtereddata[i]);
        console.log(filteredtasks);
      }
    }
    this.filtereddata = filteredtasks;
    this.displaymyworkdata = this.filtereddata;
    console.log(this.filtereddata);
  }
}
ngOnInit() {
  this._myworkService.gettopicdetails()
    .subscribe(data =>{
      console.log(data);
      this.topicdetails=data;
      for(var i=0;i<data.length;i++){
        this.selectColumns.topicids[i]=data[i].TOPIC_ID;
        this.selectColumns.topicnames[i]=data[i].TOPIC_NM;
      }
    });
  this._myworkService.getemployeedetails()
    .subscribe(data =>{
      console.log(data);
      this.employeedetails=data;
      for(var i=0;i<this.employeedetails.length;i++){
        this.selectColumns.employeenames[i]=this.employeedetails[i].EMPLOYEE_NM;
      }
    });
  this._myworkService.getsubjectdetails()
    .subscribe(data =>{
      console.log(data);
      this.subjectdetails=data;
      for(var i=0;i<this.subjectdetails.length;i++){
        this.selectColumns.subjectnames[i]=this.subjectdetails[i].SUBJECT_NM;
      }
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
    this.viewForm = this.formBuilder.group({
      EMPLOYEE_NM:[''],
      SUBJECT_NM:[''],
      TOPIC_ID:[''],
      TOPIC_NM:[''],
      TOPIC_START_DT:[''],
      TOPIC_END_DT:[''],
      ESTIMATED_TIME:[''],
      ACTUAL_TIME:['']
    });
    this.mywork();
    if(sessionStorage){
      console.log(sessionStorage);

    }
  }
/*  selectedForFilter(data){
    console.log(data);
    if(data=="MYWORK_TYPE")
    {
      var selector = document.getElementById("myworktypefilter");
      selector.innerHTML="";
      for (var i = 0; i<this.myworktype.length; i++){
        var option = document.createElement("option");
        option.value = this.myworktype[i];
        option.innerHTML = this.myworktype[i];
        selector.appendChild(option);
      }
    }
  }*/

}
