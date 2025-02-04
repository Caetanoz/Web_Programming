import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'src/app/models/local';
import { LocalRestService } from 'src/app/services/local-rest.service';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})

export class LocalListComponent implements OnInit {

   locals:any;

  constructor(private rest:LocalRestService, private route:ActivatedRoute, private router:Router, private http:HttpClient){
  }

  ngOnInit(): void {
    this.rest.getLocals().subscribe((data)=> {
      this.locals = data;
    })
  }

  view(id:string) {
    this.router.navigate(['/local-show/'+id]);
  }


}
