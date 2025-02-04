import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EventRestService } from 'src/app/services/event-rest.service';

@Component({
  selector: 'app-homepage-events',
  templateUrl: './homepage-events.component.html',
  styleUrls: ['./homepage-events.component.css']
})
export class HomepageEventsComponent implements OnInit {

  events:any;
  images:any;

  constructor(private rest:EventRestService, private route:ActivatedRoute, private router:Router, private http:HttpClient){
  }

  ngOnInit(): void {
    this.rest.getEvents().subscribe((data)=> {
      this.events = data;
    })
  }


  view(id:any) {
    this.router.navigate(['/event-show/'+id]);
  }

}
