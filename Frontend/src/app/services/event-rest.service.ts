import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/events';
import { Ticket_event } from '../models/ticket_event';


const endpoint = 'http://localhost:3000/api/events/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })

}

@Injectable({
  providedIn: 'root'
})
export class EventRestService {

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get(endpoint );
  }

  getEvent(id:string): Observable<Event> {
    return this.http.get<Event>(endpoint+'show/'+id);
  }

  Checkout(ticket:Ticket_event, id:string): Observable<Ticket_event>{
    return this.http.post<Ticket_event>(endpoint + 'tickets/' + id, JSON.stringify(ticket), httpOptions);
  }

}
