import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/events';
import { EventRestService } from 'src/app/services/event-rest.service';

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css']
})

export class EventShowComponent implements OnInit {

  @Input() event?:Event;

  constructor(private router: Router, private route: ActivatedRoute, private rest:EventRestService ) { 
    
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getEvent(idTemp).subscribe((data : Event)=>{
      this.event = data;
    })
  }

  navigateToItems(): void{
    this.router.navigate(['/events']);
  }


  Viewcheckout(id:any){
    this.router.navigate(['/checkout/events/'+id]);
  }

}