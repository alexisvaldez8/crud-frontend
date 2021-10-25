import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public router: Router;
  userRole: any
  userActual: any
  constructor(_router: Router) {
    this.router = _router;
   }

  ngOnInit(): void {
    this. checkUser();
    console.log(this.userRole);
  }

  cerrarSesion(){
    if(confirm("¿Deseas salir?")){
			alert("Sesion terminada exitosamente");
      sessionStorage.removeItem("Sesion");
      this.router.navigateByUrl('/');
		}
  }

  checkUser(){
    this.userActual = sessionStorage.getItem("Sesion");
    this.userActual = JSON.parse(this.userActual);
    this.userRole = this.userActual[0].role
  }

  

}
