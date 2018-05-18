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
  private forgotemaildetails;
  private currentemail;
  private remembermeclicked;
  //private sess=localStorage.getItem('sess1');
  loginForm: FormGroup;
  resetpasswordForm:FormGroup;
  forgotpasswordForm: FormGroup;
  registerForm:FormGroup;
  showsecurityquestionForm:FormGroup;
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
        if(this.remembermeclicked==true)
        localStorage.setItem('email',loginDetails.email);
        this._appservice.userdetails=data.userdetails;
        sessionStorage.setItem('sessionid',data.userdetails.registeremail);
        sessionStorage.setItem('sessiondetails',data.userdetails.firstname);
        this._router.navigate(['/homepage']);
      }
    });
  }
  RememberingEmail(){
    this.remembermeclicked=true;
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
  CheckSecurityAnswer(){
    var formdetails=this.showsecurityquestionForm.value;
    console.log(formdetails);
    if(formdetails.securityanswer==this.forgotemaildetails.securityanswer){
      var modal_showsecurityquestion=document.getElementById('modal_showsecurityquestion');
      modal_showsecurityquestion.style.display = "none";
      var modal_forgotpassword2=document.getElementById('modal_forgotpassword2');
       modal_forgotpassword2.style.display = "block";
    }
    else
      console.log("not equal");
  }
  CheckEmail()
  {
    var formdetails=this.forgotpasswordForm.value;
    console.log(formdetails);
    this._loginService.CheckEmail(formdetails).subscribe(response =>
    {
      console.log(response);
      this.forgotemaildetails=response.emaildetails;
      if(response.emailstatus=="exists"){
        var modal_forgotpassword1=document.getElementById('modal_forgotpassword1');
       modal_forgotpassword1.style.display = "none";
      var modal_showsecurityquestion=document.getElementById('modal_showsecurityquestion');
      modal_showsecurityquestion.style.display = "block";
        for(var i=0;i<this.securityQuestions.securityQuestions.length;i++){
         if(this.securityQuestions.securityQuestions[i].sid==response.emaildetails.securityquestion)
      this.showsecurityquestionForm.controls['securityquestion'].setValue(this.securityQuestions.securityQuestions[i].sname); 
        }
      }
    });
  }
  closeshowsecurityquestion(){
  var modal_showsecurityquestion=document.getElementById('modal_showsecurityquestion');
    modal_showsecurityquestion.style.display = "none";
  }
  
  CloseForgotPasssword2(){
    var modal_forgotpassword2=document.getElementById('modal_forgotpassword2');
    modal_forgotpassword2.style.display = "none";
  }
  
  ResetPassword(){
    var formdetails=this.resetpasswordForm.value;
    var checkpassworddetails={email:this.forgotemaildetails.registeremail,password:formdetails.password};
    console.log(checkpassworddetails);
    this._loginService.ResetPassword(checkpassworddetails).subscribe(response =>
    {
      console.log(response);
    });
  }
  
  ngOnInit() {
    var rememberedemail=localStorage.getItem('email');
    this.resetpasswordForm=this.formBuilder.group({
      password:[''],
      confirmpassword:['']
    });
    this.forgotpasswordForm = this.formBuilder.group({
      email:['']
       });
    this.showsecurityquestionForm = this.formBuilder.group({
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
    /*if(this.sess)
    {
      this._router.navigate(['/homepage']);
    }
    console.log(this.router.url);*/
  }
}
