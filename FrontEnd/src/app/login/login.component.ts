import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }  from '@angular/router';

import {LoginService} from './login.service';
import {LoginDetail} from './loginDetail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginDetails: LoginDetail[];
  private error;
  private router;
  private sess=localStorage.getItem('sess1');
  loginForm: FormGroup;
  registerForm:FormGroup;
  constructor(private _loginService: LoginService , private formBuilder: FormBuilder, private _router: Router) {
    this.router=_router;
  }
    checkLoginDetails() {
    const loginDetails = this.loginForm.value;
    console.log(loginDetails);
    if(loginDetails.email==""&&loginDetails.password=="")
    {
      this.error="make sure to enter mailid and password";
    }
    this._loginService.checkLoginDetails(loginDetails).subscribe(status =>
    {
      //this.status = status;
      console.log(status);
      if(status.status=="login success")
      {
        console.log(status);
        localStorage.setItem('sess1',"teja1");
        this._router.navigate(['/homepage']);
      }
    });
  }
  ngOnInit() {
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
