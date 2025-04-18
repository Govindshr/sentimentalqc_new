import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OlddataComponent } from './olddata/olddata.component';




@NgModule({
  imports:[RouterModule.forRoot([
    { path: "", component:LoginComponent },
    { path: "home", component: HomepageComponent },
    { path: "oldData", component: OlddataComponent },
  
  ], { useHash: true })  ] ,
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
