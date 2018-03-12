import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyworkComponent } from './mywork/mywork.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private myworkclicked;
  private toolsclicked;
  private sess = sessionStorage.getItem('sessionid');
  constructor( private _router: Router) {}
  mywork(){
    this.myworkclicked = true;
    this.toolsclicked = false;
    this.getbackgroundMywork();
    this._router.navigate(['homepage/mywork']);
  }
  getbackgroundMywork() {
    if (this.myworkclicked) {
      return "lightgray";
    }
  }
  getbackgroundTools() {
    if (this.toolsclicked) {
      return "lightgray";
    }
  }
  tools() {
    this.toolsclicked = true;
    this.myworkclicked = false;
    this.getbackgroundTools();
    console.log("tools");
    this._router.navigate(['homepage/tools']);
  }
  Logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  Login() {
    this._router.navigate(['/login']);
  }
  ngOnInit() {
    this.mywork();
  }

}
