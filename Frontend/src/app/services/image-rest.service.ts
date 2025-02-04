import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })

}
@Injectable({
  providedIn: 'root'
})
export class ImageRestService {

  constructor(private http: HttpClient) { }

  getImage(img:string): Observable<Blob>{
    return this.http.get(endpoint+ 'images/' + img, {responseType: 'blob'});
  }
}
