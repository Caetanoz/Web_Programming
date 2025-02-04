import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Local } from '../models/local';
import { Ticket_locals } from 'src/app/models/ticket_locals';

const endpoint = 'http://localhost:3000/api/local/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};



@Injectable({
  providedIn: 'root'
})

export class LocalRestService {

  constructor(private http: HttpClient) { }

  getLocals(): Observable<Local[]> {
    return this.http.get<Local[]>(endpoint );
  }

  getLocal(id:string): Observable<Local> {
    return this.http.get<Local>(endpoint+'show/'+id);
  }

  Checkout(ticket:Ticket_locals, id:string): Observable<Ticket_locals>{
    return this.http.post<Ticket_locals>(endpoint + 'tickets/' + id, JSON.stringify(ticket), httpOptions);
  }


}
