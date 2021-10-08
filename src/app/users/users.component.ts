import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../modelos/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  usersDetail: any
  addUserFlag: boolean = false;
  
  user : User = {
    idUser: 0,
    email: "",
    englishLevel: "",
    knowledge: "",
    cv: ""
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.apiService.getUsersDetail().subscribe(
      async (res) => {
        console.log(res);
        this.usersDetail = res;
      },
      (err) => console.log(err)
    );
  }
  registroUser(){
    delete this.user.idUser;
    console.log(this.user);
    this.apiService.saveUser(this.user).subscribe(
      res => {
            console.log(res);
      },
      err => {
            console.error(err)
      }
    );
  }

  addUserActivate(){
    this.addUserFlag = true;
  }

}
