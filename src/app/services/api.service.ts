import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, User } from '../modelos/models';

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
  getAccounts(){
    return this.http.get(`${this.API}/accounts`);
  }
  saveUser(user : User){
    return this.http.post(`${this.API}/users-detail-register/`,user)
  }
  deleteUser(idUser : number){
    return this.http.delete(`${this.API}/${idUser}`)
  }
  saveAccount(account : Account){
    return this.http.post(`${this.API}/accounts-register/`,account)
  }
}
