import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResService } from 'src/app/services/auth-res.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password:string;
  public message!:string;

  constructor(private router: Router, private authService: AuthResService) { 
    this.password="";
    this.email="";
  }

  ngOnInit(): void {
    
  }


  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('role', user.role);
          localStorage.setItem('id', user.id);
          this.router.navigate(['/']);
        } else {
          this.message = 'Erro no login!';
        }
      },
      (error) => {
        if (error.status === 404) {
          this.message = 'Erro no login!';
        } 
      }
    );
  }
  

  

}
