import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../modelos/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  usersDetail: any;
  addUserFlag: boolean = false;

  user: User = {
    idUser: 0,
    email: '',
    englishLevel: '',
    knowledge: '',
    cv: '',
  };
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsersDetail().subscribe(
      async (res) => {
        this.usersDetail = res;
      },
      (err) => console.log(err)
    );
  }
  cleanUser() {
    this.user = {
      idUser: 0,
      email: '',
      englishLevel: '',
      knowledge: '',
      cv: '',
    };
  }
  saveUser() {

    if(this.user.email !== '' && this.user.cv !== '' && this.user.englishLevel !== '' && this.user.knowledge !== '' ){
      delete this.user.idUser;
    console.log(this.user);
    this.apiService.saveUser(this.user).subscribe(
      (res) => {
        console.log(res);
        this.cleanUser();
        alert('¡Usuario almacenado de forma correcta!');
        this.getUsers();
        this.addUserFlag = false;
      },
      (err) => {
        console.error(err);
      }
    );
    } else {
      alert('¡Debes completar todos los campos!')
    }
    
  }

  addUserActivate() {
    this.addUserFlag = true;
  }
  showUsers(){
    this.addUserFlag = false;
  }
  deleteUser(idUser: number) {
    console.log(idUser, '<--usuario a borrar');
    this.apiService.deleteUser(idUser).subscribe(
      (res) => {
        console.log(res);
        alert("¡Usuario eliminado correctamente!");
        location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
