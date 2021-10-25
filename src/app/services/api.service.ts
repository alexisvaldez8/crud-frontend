import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, Change, User } from '../modelos/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getLogin(user: string, password: any){
    return this.http.get(`${this.API}/${user}/${password}`);
  }
  getUsersDetail(){
    return this.http.get(`${this.API}/users-detail`);
  }
  getAccounts(){
    return this.http.get(`${this.API}/accounts`);
  }
  getChanges(){
    return this.http.get(`${this.API}/changes`);
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
  saveChange(change : Change){
    return this.http.post(`${this.API}/changes-register/`,change)
  }
  deleteAccount(idAccount : number){
    return this.http.delete(`${this.API}/accounts/${idAccount}`)
  }
  deleteChange(idChanges : number){
    return this.http.delete(`${this.API}/changes/${idChanges}`)
  }
}
