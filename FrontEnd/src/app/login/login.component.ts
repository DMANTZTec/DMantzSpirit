import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }  from '@angular/router';

import {LoginService} from './login.service';
import {LoginDetail} from './loginDetail';
import {AppService} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginDetails: LoginDetail[];
  private userdetails;
  private error;
  private router;
  private sess=localStorage.getItem('sess1');
  loginForm: FormGroup;
  resetpasswordForm:FormGroup;
  forgotpasswordForm: FormGroup;
  registerForm:FormGroup;
  private submittedSecurityAnswer=true;
  private securityQuestions={securityQuestions:
    [{sid:"colour",sname:"What is your favourite colour"},
      {sid:"place",sname:"What is your favourite place"},
      {sid:"school",sname:"What is your first school name"}
    ]};

  constructor(private _appservice:AppService,private _loginService: LoginService , private formBuilder: FormBuilder, private _router: Router) {
    this.router=_router;
  }
    checkLoginDetails() {
    const loginDetails = this.loginForm.value;
    console.log(loginDetails);
    if(loginDetails.email==""&&loginDetails.password=="")
    {
      this.error="make sure to enter mailid and password";
    }
    this._loginService.checkLoginDetails(loginDetails).subscribe(data =>
    {
      console.log(data);
      if(data.status=="login success")
      {
        this._appservice.userdetails=data.userdetails;
        sessionStorage.setItem('sessionid',data.userdetails.registeremail);
        sessionStorage.setItem('sessiondetails',data.userdetails.firstname);
        this._router.navigate(['/homepage']);
      }
    });
  }
  ForgotPassword()
  {
    var modal_forgotpassword1=document.getElementById('modal_forgotpassword1');
    modal_forgotpassword1.style.display = "block";
  }
  CloseForgotPasssword1(){
    var modal_forgotpassword1=document.getElementById('modal_forgotpassword1');
    modal_forgotpassword1.style.display = "none";
  }
  CheckSecurityAnswer()
  {
    var modal_forgotpassword1=document.getElementById('modal_forgotpassword1');
    modal_forgotpassword1.style.display = "none";
      var modal_forgotpassword2=document.getElementById('modal_forgotpassword2');
      modal_forgotpassword2.style.display = "block";

    var formdetails=this.forgotpasswordForm.value;
    console.log(formdetails);
    this._loginService.CheckSecurityAnswer(formdetails).subscribe(status =>
    {
      console.log(status);
    });
  }
  CloseForgotPasssword2(){
    var modal_forgotpassword2=document.getElementById('modal_forgotpassword2');
    modal_forgotpassword2.style.display = "none";
  }
  ngOnInit() {
    this.resetpasswordForm=this.formBuilder.group({
      password:[''],
      confirmpassword:['']
    });
    this.forgotpasswordForm = this.formBuilder.group({
      email:[''],
      securityquestion:[''],
      securityanswer:['']
    });
    this.registerForm=this.formBuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      password:[''],
      confirmpassword:[''],
      captcha:[''],
      DOB:[''],
      phone:['']
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')])],
    });
    if(this.sess)
    {
      this._router.navigate(['/homepage']);
    }
    console.log(this.router.url);
  }
}
