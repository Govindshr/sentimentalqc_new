import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email :any
password:any
flag:any=false

constructor(private router:Router){

  }

  submitValue(){
  if(this.email==="kajal@qdegrees.org" && this.password=="12345")
  {
    this.router.navigate(["home"])
  }
 
  else{
    console.log(this.email)
    this.flag=true
  }

}
}