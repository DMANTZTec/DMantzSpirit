import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import {LoginService} from './login/login.service';
import { LoginComponent } from './login/login.component';
import { MyworkComponent } from './mywork/mywork.component';
import { MyworkService } from './mywork/mywork.service';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'homepage', component: MyworkComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyworkComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [LoginService, MyworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
