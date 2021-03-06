import { Component, OnInit } from '@angular/core';
import {MyworkService} from "../../services/mywork.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';

import {Mywork} from "./mywork";
import {document} from "@angular/platform-browser/src/facade/browser";
import {AppService} from "../../app.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.css']
})
export class MyworkComponent implements OnInit {
  private myworkdata;
  private filteredemployeedata=[];
  private filteredsubjectdata=[];
  private displaymyworkdata;
  private currentmyworkdata;
  private filtereddata = [];
  private myworktypespecificdata = [];
  createForm: FormGroup;
  projectForm: FormGroup;
  viewForm: FormGroup;
  private form;
  private selectedRow;
  private myworkclicked;
  private toolsclicked;
  public employeedetails;
  public subjectdetails;
  public topicdetails;
  public showTopicIDs=[];
  //private newmywork: Mywork[];
  private sess = sessionStorage.getItem('sessionid');
  private selectColumns = {
    myworktype: ["PROJECT", "TOPIC"],
    employeenames: [],
    subjectnames: [],
    topicids: [],
    topicnames: []
  };
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  private userselectedcolumns = {
    myworktype: "PROJECT",
    employeenames: "EMPLOYEES",
    subjectnames: "SUBJECTS",
    topicids: "TOPICIDS",
    topicnames: "TOPICNAMES"
  };
  private topics = [{tid: "T0001", tname: "HTTP Observables"}, {
    tid: "T0002",
    tname: "Angular2 concepts"
  }, {tid: "T0003", tname: "Angular2 components"}];

  constructor(private _appservice: AppService, private _myworkService: MyworkService, private formBuilder: FormBuilder, private _router: Router) {
  }

  onDateChanged(value) {
    console.log(value);
  }
  mywork() {

    this.myworkclicked = true;
    this.toolsclicked = false;
    //this.getbackgroundMywork();
    var project = [];
    //document.getElementById("mywork").backgroundColor="violet";
    this._myworkService.getMyworkData()
      .subscribe(myworkdata => {
        this.myworkdata = myworkdata;
        console.log(this.myworkdata);
        for (var i = 0; i < this.myworkdata.length; i++) {
          if (this.myworkdata[i].MYWORK_TYPE == "PROJECT") {
            project.push(this.myworkdata[i]);
          }
        }
        this.myworktypespecificdata = project;
        this.filteredemployeedata=project;
        this.filteredsubjectdata=project;
        this.displaymyworkdata = project;
        console.log(project);
        this.TableRowClicked(this.displaymyworkdata[0], 0);
      });
  }

  TopicIDSelected(selectedvalue) {
    console.log(selectedvalue);
    for (var i = 0; i < this.topicdetails.length; i++) {
      if (this.topicdetails[i].TOPIC_ID == selectedvalue) {
        this.createForm.controls['TOPIC_NM'].setValue(this.topicdetails[i].TOPIC_NM);
      }
    }
  }
  SubjectNameSelected(selectedsubject){
    this.showTopicIDs=[];
    for (var i = 0; i < this.topicdetails.length; i++) {
    for (var j = 0; j < this.subjectdetails.length; j++) {
      if (this.subjectdetails[j].SUBJECT_NM == selectedsubject) {
      if (this.subjectdetails[j].SUBJECT_CODE == this.topicdetails[i].TOPIC_ID.substring(0,2)) {
        this.showTopicIDs.push(this.topicdetails[i].TOPIC_ID)
      }
    }
  }
}
console.log(this.showTopicIDs);
}
AddNewMyworkData(value) {
    this.form = value;
    console.log(this.form);
    var createmywork = this.form;
    console.log(createmywork);
    this._myworkService.AddNewMyworkData(createmywork).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }
  ShowTopicForm() {
    var modal_topictask = document.getElementById('modal_topictask');
    var close = document.getElementsByClassName("closetopictask")[0];
    modal_topictask.style.display = "block";
    close.onclick = function () {
      modal_topictask.style.display = "none";
    };
    if (document.getElementById('update').style.display == 'block')
      document.getElementById('update').style.display = 'none';
    this.createForm.reset();
    document.getElementById('create').style.display = 'block';
    console.log(sessionStorage.getItem('sessiondetails'));
    this.createForm.controls['EMPLOYEE_NM'].setValue(sessionStorage.getItem('sessiondetails'));
  }
  ShowProjectForm() {
    var modal_projecttask = document.getElementById('modal_projecttask');
    var close = document.getElementsByClassName("close")[0];
    modal_projecttask.style.display = "block";
    close.onclick = function () {
      modal_projecttask.style.display = "none";
    };
    if (document.getElementById('updateproject').style.display == 'block')
      document.getElementById('updateproject').style.display = 'none';
    this.projectForm.reset();
    document.getElementById('createproject').style.display = 'block';
    console.log(sessionStorage.getItem('sessiondetails'));
    this.projectForm.controls['EMPLOYEE_NM'].setValue(sessionStorage.getItem('sessiondetails'));
  }
  edit(data) {
    this.currentmyworkdata = data;
    console.log(this.currentmyworkdata);
    console.log(data);
    if (data.MYWORK_TYPE == "PROJECT TASK") {
      this.ShowProjectForm();
      document.getElementById('updateproject').style.display = 'block';
      if (document.getElementById('createproject').style.display == 'block')
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
      document.getElementById('update').style.display = 'block';
      if (document.getElementById('create').style.display == 'block')
        document.getElementById('create').style.display = 'none';
      this.createForm.controls['EMPLOYEE_NM'].setValue(data.EMPLOYEE_NM);
      this.createForm.controls['SUBJECT_NM'].setValue(data.SUBJECT_NM);
      this.createForm.controls['TOPIC_ID'].setValue(data.TOPIC_ID);
      //this.createForm.controls['TOPIC_ID'].disable();
      this.createForm.controls['TOPIC_NM'].setValue(data.TOPIC_NM);
      this.createForm.controls['TOPIC_START_DT'].setValue(data.TOPIC_START_DT);
      this.createForm.controls['TOPIC_END_DT'].setValue(data.TOPIC_END_DT);
      this.createForm.controls['ESTIMATED_TIME'].setValue(data.ESTIMATED_TIME);
      this.createForm.controls['ACTUAL_TIME'].setValue(data.ACTUAL_TIME);
    }
  }
  UpdateMyworkData() {
    var editmywork = this.createForm.value;
    console.log(editmywork);
    this._myworkService.UpdateMyworkData(editmywork, this.currentmyworkdata).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }
  view(data) {
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
  TableRowClicked(data, i) {
    this.selectedRow = i;
    console.log(data);
    this.view(data);
  }
  FilteringMyworkType(selectedvalue) {
    var filteredtasks = [];
    this.userselectedcolumns.myworktype = selectedvalue;
    console.log(selectedvalue);
    console.log(this.userselectedcolumns);
    for (var i = 0; i < this.myworkdata.length; i++) {
      if (this.myworkdata[i].MYWORK_TYPE == this.userselectedcolumns.myworktype) {
        filteredtasks.push(this.myworkdata[i]);
      }
    }
    console.log(filteredtasks);
    this.myworktypespecificdata = filteredtasks;
    this.filteredemployeedata=filteredtasks;
    this.filteredsubjectdata=filteredtasks;
    this.displaymyworkdata = this.myworktypespecificdata;
    console.log(this.myworktypespecificdata);
    this.userselectedcolumns.employeenames = "EMPLOYEES";
    this.userselectedcolumns.subjectnames = "SUBJECTS";
    document.getElementById('employeeselect').value = "EMPLOYEES";
    document.getElementById('subjectselect').value = "SUBJECTS";
  }

  FilteringEmployee(selectedvalue) {
    this.userselectedcolumns.employeenames = selectedvalue;
    console.log(selectedvalue);
    var filteredtasks = [];
    if (this.userselectedcolumns.employeenames == "EMPLOYEES") {
      for (var i = 0; i < this.myworktypespecificdata.length; i++) {
        if ((this.myworktypespecificdata[i].EMPLOYEE_NM) != "") {
          filteredtasks.push(this.myworktypespecificdata[i]);
        }
      }
    }
    else {
      for (var i = 0; i < this.myworktypespecificdata.length; i++) {
        if (this.myworktypespecificdata[i].EMPLOYEE_NM == this.userselectedcolumns.employeenames) {
          filteredtasks.push(this.myworktypespecificdata[i]);
        }
      }
    }
    console.log(filteredtasks);
    this.filteredemployeedata = filteredtasks;
    this.filter();
  }
  FilteringSubject(selectedvalue)
  {
    this.userselectedcolumns.subjectnames = selectedvalue;
    console.log(selectedvalue);
    var filteredtasks=[];
    if(this.userselectedcolumns.subjectnames=="SUBJECTS") {
      for (var i = 0; i < this.myworktypespecificdata.length; i++) {
        if ((this.myworktypespecificdata[i].SUBJECT_NM) != "") {
          filteredtasks.push(this.myworktypespecificdata[i]);
        }
      }
    }
    else{
      for (var i = 0; i < this.myworktypespecificdata.length; i++) {
        if (this.myworktypespecificdata[i].SUBJECT_NM == this.userselectedcolumns.subjectnames) {
          filteredtasks.push(this.myworktypespecificdata[i]);
        }
      }
    }
    this.filteredsubjectdata = filteredtasks;
    console.log(filteredtasks);
    this.filter();
  }
  filter(){
    var filteredtasks=[];
    console.log(this.filteredsubjectdata);
    console.log(this.filteredemployeedata);
    for(var i=0;i<this.myworktypespecificdata.length;i++){
      for(var j=0;j<this.filteredemployeedata.length;j++){
        for(var k=0;k<this.filteredsubjectdata.length;k++){
          if(this.myworktypespecificdata[i]==this.filteredemployeedata[j] &&this.myworktypespecificdata[i]==this.filteredsubjectdata[k] ){
            filteredtasks.push(this.myworktypespecificdata[i]);
          }
        }
      }
    }
    console.log(filteredtasks);
    this.filtereddata=filteredtasks;
    this.displaymyworkdata=this.filtereddata;
  }
  ngOnInit() {
    this._myworkService.gettopicdetails()
      .subscribe(data =>{
        console.log(data);
        this._myworkService.settopicdetails(data);
        this.topicdetails=data;
        for(var i=0;i<data.length;i++){
          this.selectColumns.topicids[i]=data[i].TOPIC_ID;
          this.selectColumns.topicnames[i]=data[i].TOPIC_NM;
        }
      });
    this._myworkService.getemployeedetails()
      .subscribe(data =>{
        console.log(data);
        this._myworkService.setemployeedetails(data);
        this.employeedetails=data;
        for(var i=0;i<this.employeedetails.length;i++){
          this.selectColumns.employeenames[i]=this.employeedetails[i].EMPLOYEE_NM;
        }
      });
    this._myworkService.getsubjectdetails()
      .subscribe(data =>{
        console.log(data);
        this._myworkService.setsubjectdetails(data);
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
