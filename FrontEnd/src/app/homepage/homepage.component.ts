import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyworkComponent } from './mywork/mywork.component';
import {MyworkService} from "../services/mywork.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private myworkclicked;
  private toolsclicked;
  private sess = sessionStorage.getItem('sessionid');
  constructor( private _router: Router,private _myworkService:MyworkService) {}
  mywork()
  {
    this.myworkclicked = true;
    this.toolsclicked = false;
    this.getbackgroundMywork();
    if(!this.sess){
          this._router.navigate(['/login']);
    }
    else
        this._router.navigate(['homepage/mywork']);
        //if(document.getElementById('tools').=='TOOLS')
       // console.log("tools hhjgfd");
   // document.getElementById('tools').innerText='TOOLS';
  }
  getbackgroundMywork() {
    if (this.myworkclicked) {
      return "gray";
    }
  }
  getbackgroundTools() {
    if (this.toolsclicked) {
      return "gray";
    }
  }
  tools() {
    this.toolsclicked = true;
    this.myworkclicked = false;
    this.getbackgroundTools();
    console.log("tools");
    this._router.navigate(['homepage/topicstore']);
  }
  projectstoreSelected(){
    this.toolsclicked = true;
    this.myworkclicked = false;
    this.getbackgroundTools();
    this._router.navigate(['homepage/projectstore']);
    document.getElementById('tools').innerText='ProjectStore';
    //document.getElementById('tools').value='ProjectStore';

  }
  topicstoreSelected(){
    this.toolsclicked = true;
    this.myworkclicked = false;
    this.getbackgroundTools();
    this._router.navigate(['homepage/topicstore']);
    document.getElementById('tools').innerText='TopicStore';
   // document.getElementById('tools').value='TopicStore';
  }
  Logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
  ngOnInit() {
  
    this.mywork();
  }
}
