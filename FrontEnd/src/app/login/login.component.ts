import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  loginForm: FormGroup;
  constructor(private _loginService: LoginService , private formBuilder: FormBuilder, private _router: Router) { }

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
        this._router.navigate(['/homepage']);
      }
    });
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')])],
    });
  }

}
