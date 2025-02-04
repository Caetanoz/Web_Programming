import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResService } from 'src/app/services/auth-res.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  message:any;
  currentUser:any;

  constructor(private router: Router, private authServive: AuthResService, private route:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.route.queryParams.subscribe(params => {
      this.message = params['message'];
      if (this.message) {
        console.log(this.message); // ou faça qualquer outra manipulação com a mensagem
      }
    });
  }

}
