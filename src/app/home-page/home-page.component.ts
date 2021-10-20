import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userRole: any;
  userActual: any;
  userName: any;
  englishLevel: any;
  knowledge: any;
  cv: any;

  constructor() { }

  ngOnInit(): void {
    this. checkUser();
    console.log(this.userRole);
  }
  checkUser(){
    this.userActual = sessionStorage.getItem("Sesion");
    this.userActual = JSON.parse(this.userActual);
    console.log(this.userActual[0]);
    this.userRole = this.userActual[0].role;
    this.userName = this.userActual[0].email;
    this.englishLevel = this.userActual[0].englishLevel;
    this.knowledge = this.userActual[0].knowledge;
    this.cv = this.userActual[0].cv;
  }


}
