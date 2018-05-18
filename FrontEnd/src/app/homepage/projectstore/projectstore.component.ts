import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import {MyworkService} from "../../services/mywork.service";

@Component({
  selector: 'app-projectstore',
  templateUrl: './projectstore.component.html',
  styleUrls: ['./projectstore.component.css']
})
export class ProjectstoreComponent implements OnInit {
  projectForm: FormGroup;
  private topicdetails;
  private employeedetails;
  private projectdetails;
  constructor( private formBuilder: FormBuilder, private _router: Router,private _myworkService: MyworkService) {
  }  close(){
    var modal_projecttask = document.getElementById('modal_projecttask');
    modal_projecttask.style.display = "none";
  }
  AddNewProjectTask(){
    var modal_projecttask = document.getElementById('modal_projecttask');
    modal_projecttask.style.display = "block";
      if (document.getElementById('updateproject').style.display == 'block')
        document.getElementById('updateproject').style.display = 'none';
      this.projectForm.reset();
      document.getElementById('createproject').style.display = 'block';
      console.log(sessionStorage.getItem('sessiondetails'));
      this.projectForm.controls['EMPLOYEE_NM'].setValue(sessionStorage.getItem('sessiondetails'));
  }
  ngOnInit() {
    this.topicdetails=this._myworkService.topicdetails;
    this.employeedetails=this._myworkService.employeedetails;
    this.projectdetails=this._myworkService.subjectdetails;
    console.log(this.employeedetails);
    this.projectForm = this.formBuilder.group({
      EMPLOYEE_NM:[''],
      PROJECT_NM:[''],
      MODULES:[''],
      TASK_ID:3[''],
      TASK_NM:[''],
      TASK_START_DT:[''],
      ESTIMATED_TIME:['']
    });
  }
}
