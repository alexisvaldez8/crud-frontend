import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modelos/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getLogin(user: string, password: string){
    return this.http.get(`${this.API}/${user}/${password}`);
  }
  getUsersDetail(){
    return this.http.get(`${this.API}/users-detail`);
  }
  saveUser(user : User){
    return this.http.post(`${this.API}/users-detail-register/`,user)
  }
}
