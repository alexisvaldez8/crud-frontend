import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  getLogin(user: string, password: string){
    return this.http.get(`${this.API}/${user}/${password}`);
  }
}
