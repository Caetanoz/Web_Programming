import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResService } from 'src/app/services/auth-res.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  @Input() user?:User;

  constructor(private router: Router, private authService: AuthResService, private route: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.authService.getUser(idTemp).subscribe((data : User)=>{
    this.user = data;
    });
  }

}

