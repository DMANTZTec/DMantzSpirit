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
  private registersecurityQuestion={registersecurityQuestion:
    [{sid:"colour",sname:"What is your favourite colour"},
      {sid:"place",sname:"What is your favourite place"},
      {sid:"school",sname:"What is your first school name"}
    ]};
  private loggedin = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private _loginService: LoginService, private formBuilder: FormBuilder, private _router: Router) {
    this.router = _router;
  }

  checkLoginDetails() {
    const loginDetails = this.loginForm.value;
    console.log(loginDetails);
    if (loginDetails.email == "" && loginDetails.password == "") {
      this.error = "make sure to enter mailid and password";
    }
    this._loginService.checkLoginDetails(loginDetails).subscribe(status => {
      //this.status = status;
      console.log(status);
      if (status.status == "login success") {
        console.log(status);
        this._router.navigate(['/homepage']);
      }
    });
  }
  registrationform() {
   var model=document.getElementById("modal_register");
   model.style.display="block";
  }
  Closeregister(){
    var model=document.getElementById("modal_register");
    model.style.display="none";
  }

  ngOnInit()
  {
    this.registerForm=this.formBuilder.group({
      firstname:['', Validators.compose([Validators.required, Validators.minLength(5)])],
      lastname:['', Validators.compose([Validators.required, Validators.minLength(5)])],
      registeremail:['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      registerpassword:['',  Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')])],
      confirmpassword:[''],
      captcha:[''],
      captchaimage:[''],
      registersecurityQuestion:[''],
      registersecurity:['']
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')])],
    });
    console.log(this.router.url);

// When the user clicks on <span> (x), close the modal span


// When the user clicks anywhere outside of the modal, close it

  }

}

