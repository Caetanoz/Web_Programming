import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/events';
import { Ticket_event } from 'src/app/models/ticket_event';
import { EventRestService } from 'src/app/services/event-rest.service';

@Component({
  selector: 'app-checkout-events',
  templateUrl: './checkout-events.component.html',
  styleUrls: ['./checkout-events.component.css']
})
export class CheckoutEventsComponent implements OnInit{

  @Input() event?:Event;
  @Input() ticket:Ticket_event;
    public quantity?:any;
    public price?:any;
    message : any;

  constructor(private rest:EventRestService, private route:ActivatedRoute, private router:Router, private http:HttpClient){
  this.ticket = new Ticket_event();
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getEvent(idTemp).subscribe((data : Event)=>{
      this.event = data;
    })
    this.quantity;
  }

  updateTotal(ticketprice:any) {
    this.quantity = this.ticket.quantity;
    this.price = ticketprice;
  }
  
  calculateTotal() {
    
    return this.quantity*this.price;
  }  
  


    checkout(id:any, name:any, address:any, duration:any): void{
      if(this.ticket.quantity == null || this.ticket.quantity < 0){
        this.message = "Your quantity must be 0 or higher!!";
      }else if(this.ticket.email == null || this.ticket.email == ""){
        this.message = "Your email is missing!!";
      }else if(this.ticket.nif == null || this.ticket.nif <= 99999999 || this.ticket.nif >= 1000000000){
        this.message = "User nif is wrong. ex.[231675900]..!!!"
      }else {
      this.ticket.ticketprice = this.quantity * this.price;
      this.ticket.eventID = id;
      this.ticket.placename = name;
      this.ticket.address = address;
      this.ticket.duration = duration;
      this.rest.Checkout(this.ticket,id).subscribe((data:Ticket_event)=>{
      })
      const message = 'Successfully bought an ticket!';
      this.router.navigate(['/'], { queryParams: { message: message } 
    }); 
      }
    }
   
}
