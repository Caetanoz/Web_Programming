import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthResService } from 'src/app/services/auth-res.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() user:User;
  message:any;

  constructor(private router: Router, private rest:AuthResService) { 
    this.user= new User();
  } 

  ngOnInit(): void {
  }


  register(): void{
    if(this.user.name == null || this.user.name == ""){
      this.message = "User name is missing!!!"
    }else if(this.user.email == null || this.user.email == ""){
      this.message = "User email is missing!!!"
    }else if(this.user.password == null || this.user.password == ""){
      this.message = "User password is missing!!!"
    }else if(this.user.address == null || this.user.address == ""){
      this.message = "User address is missing!!!"
    }else if(this.user.location == null || this.user.location == ""){
      this.message = "User location is missing!!!"
    }else if(this.user.birthdate == null || this.user.birthdate == ""){
      this.message = "User birthdate is missing!!!"
    }else if(this.user.nif == null || this.user.nif <= 99999999 || this.user.nif >1000000000){
      this.message = "User nif is wrong. ex.[231675900]..!!!"
    }else if(this.user.cell == null || this.user.cell <= 900000000 || this.user.cell >1000000000){
      this.message = "User phonenumber is wrong. ex.[910003710]..!!!"
    }else{
      this.user.role == 'Client',
      this.rest.register(this.user).subscribe((data: User)=>{
        alert('User added!')
        this.router.navigate(['/']);
      });
    }
  }





}
