import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt-session';
import { Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import {LoginService} from './login/login.service';
import { LoginComponent } from './login/login.component';
import { MyworkComponent } from './mywork/mywork.component';
import { MyworkService } from './mywork/mywork.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}
export const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'login', component: LoginComponent },
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
  providers: [LoginService, MyworkService,{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
