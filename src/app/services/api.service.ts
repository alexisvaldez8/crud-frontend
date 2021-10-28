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
  filterByEmail(email : string){
    return this.http.get(`${this.API}/changes/filter-email/${email}`)
  }
  filterByComputer(computer : string){
    return this.http.get(`${this.API}/changes/filter-computer/${computer}`)
  }
  filterByDateStart(dateStart : string){
    return this.http.get(`${this.API}/changes/filter-date-start/${dateStart}`)
  }
  filterByDateEnd(dateEnd : string){
    return this.http.get(`${this.API}/changes/filter-date-end/${dateEnd}`)
  }
  filterByid(id : string){
    return this.http.get(`${this.API}/changes/filter/${id}`)
  }
  updateChange(id: any, updateChange: Change){
    return this.http.put(`${this.API}/changes/update/${id}`, updateChange);
  }
}
