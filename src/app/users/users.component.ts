import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../modelos/models';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  usersDetail: any;
  addUserFlag: boolean = false;
  userRole: any;
  userActual: any;
  md5 = new Md5();

  user: User = {
    idUser: 0,
    email: '',
    englishLevel: '',
    knowledge: '',
    cv: '',
    role: '',
    password: '',
  };
  ngOnInit(): void {
    this.getUsers();
    this.checkUser();
    console.log(this.userRole);
  }

  checkUser() {
    this.userActual = sessionStorage.getItem('Sesion');
    this.userActual = JSON.parse(this.userActual);
    this.userRole = this.userActual[0].role;
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
      role: '',
      password: '',
    };
  }
  saveUser() {
    if (
      this.user.email !== '' &&
      this.user.cv !== '' &&
      this.user.englishLevel !== '' &&
      this.user.knowledge !== '' &&
      this.user.role !== '' &&
      this.user.password !== ''
    ) {
      delete this.user.idUser;
      this.user.password = this.md5.appendStr(this.user.password).end();
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
      alert('¡Debes completar todos los campos!');
    }
  }

  addUserActivate() {
    this.addUserFlag = true;
  }
  showUsers() {
    this.addUserFlag = false;
  }
  deleteUser(idUser: number, email: string) {
    if (confirm('¿Seguro que deseas eliminar este usuario?(' + email + ')')) {
      console.log(idUser, '<--usuario a borrar');
      this.apiService.deleteUser(idUser).subscribe(
        (res) => {
          console.log(res);
          alert('¡Usuario eliminado correctamente!');
          location.reload();
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
