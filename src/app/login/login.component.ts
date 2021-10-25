import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;
  public loginRes: any;
  public router: Router;
  public md5 = new Md5();
  constructor(private apiService: ApiService, _router: Router) {
    this.router = _router;
  }

 login(email: string, password: any) {
   console.log(email, password);
   let pass = this.md5.appendStr(password).end();
   console.log(pass);
   
   // console.log(this.md5.appendStr(password).end());
   
    this.apiService.getLogin(email, pass).subscribe(
      async (res) => {
        console.log(res);
        this.loginRes = res;
        console.log(this.loginRes);
        await this.validarlogin()
      },
      (err) => console.log(err)
    );
  }

  validarlogin(){
    if(this.loginRes.length > 0){
      sessionStorage.setItem("Sesion", JSON.stringify(this.loginRes));
      this.router.navigateByUrl('/home');
    }else {
      alert("Correo y/o contraseña invalidos!")
    }
  }

  ngOnInit(): void {}
}
