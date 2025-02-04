import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthResService {

  constructor(private http: HttpClient) { }

  login(email: string, password:string): Observable<AuthRestModelResponse>{
    return this.http.post<AuthRestModelResponse>(endpoint + "auth/login", new LoginModel( email, password));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.http.get(endpoint + 'logout');
  }

  register (user:User): Observable<User> {
    console.log(user);
    return this.http.post<User>(endpoint + 'register', JSON.stringify(user), httpOptions);
  }

  getUser(id:string): Observable<User> {
    return this.http.get<User>(endpoint+'perfil/'+id);
  }

}

export interface AuthRestModelResponse{

}

export class LoginModel{

  constructor(public email:string, public password:string){}

}
