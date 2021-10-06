import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: any;
  public password: any;
  public loginRes: any;
  public router: Router;

  constructor(private apiService: ApiService, _router: Router) {
    this.router = _router;
  }

 login(user: string, password: string) {
    this.apiService.getLogin(user, password).subscribe(
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
      this.router.navigateByUrl('/home');
    }else {
      alert("¡Usuario y/o contraseña invalidos!")
    }
  }

  ngOnInit(): void {}
}
