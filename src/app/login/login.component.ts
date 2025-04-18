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
  if(this.email==="atlas@qdegrees.org" && this.password=="Atlas@123")
  {
    this.router.navigate(["home"])
  }
 
  else{
    console.log(this.email)
    this.flag=true
  }

}
}