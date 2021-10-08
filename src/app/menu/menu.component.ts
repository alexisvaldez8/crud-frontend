import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public router: Router;
  constructor(_router: Router) {
    this.router = _router;
   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    sessionStorage.removeItem("Sesion");
    this.router.navigateByUrl('/');
  }
  

}
