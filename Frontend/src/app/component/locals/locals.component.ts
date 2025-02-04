import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalRestService } from 'src/app/services/local-rest.service';
import { Local } from 'src/app/models/local';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent {

  locals?:any;

  constructor(private rest:LocalRestService, private route:ActivatedRoute, private router:Router, private http:HttpClient){
  }

  ngOnInit(): void {
    this.rest.getLocals().subscribe((data)=> {
      this.locals = data;
    })
  }

  view(id:any) {
    this.router.navigate(['/local-show/'+id]);
  }

  Viewcheckout(id:any){
    this.router.navigate(['/checkout/locals/'+id]);
  }

}
