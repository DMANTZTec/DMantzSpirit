import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {LoginDetail} from './loginDetail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginDetails:LoginDetail[];

  constructor(private _loginService:LoginService) { }

  checkLoginDetails(loginDetails)
  {
    this._loginService.checkLoginDetails(loginDetails).subscribe(loginDetails=>{
      this.loginDetails=loginDetails;
    });
  }
  ngOnInit() {

  }

}
