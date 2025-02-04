import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthResService } from 'src/app/services/auth-res.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUser:any;
  role:any;
  userID : any;
  admin!: boolean;


  constructor(private router: Router, private authService: AuthResService, private cookie:CookieService) { 
  }


  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.role = localStorage.getItem('role');
    this.userID = localStorage.getItem('id');
    this.admin = this.isAdmin(this.role);
  }

  isAdmin(role:any): boolean{
    if(role==='Admin'){
      return true
    }else{
      return false;
    }
  }

  
  logout(){
    this.authService.logout();
    alert('Successfully logged out!');
    this.router.navigate(['/login']);
  }

  ViewPerfil(id:any){
    this.router.navigate(['/perfil/'+id]);
  }

}
