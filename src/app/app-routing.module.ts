import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OlddataComponent } from './olddata/olddata.component';
import { AuthGuard } from './auth.guard';



@NgModule({
  imports: [RouterModule.forRoot([
    { path: "", component: LoginComponent },
    { path: "home", component: HomepageComponent, canActivate: [AuthGuard] },
    { path: "oldData", component: OlddataComponent, canActivate: [AuthGuard] },
  ], { useHash: true })],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
