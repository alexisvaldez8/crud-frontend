import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Account } from '../modelos/models';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  public accounts:any;
  addAccountFlag: boolean = false;

  account: Account = {
    idAccount: 0,
    accountName: "",
    clientName: "",
    ownerOperation: "",
    checkAccount: "",
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.apiService.getAccounts().subscribe(
      async (res) => {
        this.accounts = res;
        console.log(this.accounts);
      },
      (err) => console.log(err)
    );
  }
  deleteAccount(idAccount: number){
    console.log(idAccount, '<--usuario a borrar');
    this.apiService.deleteAccount(idAccount).subscribe(
      (res) => {
        console.log(res);
        alert("¡Cuenta eliminada correctamente!");
        location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }
  showAccounts(){
    this.addAccountFlag = false;
  }
  addAccountActivate(){
    this.addAccountFlag = true;
  }
  addAccount(){
    if(this.account.accountName !== '' && this.account.checkAccount !== '' && this.account.clientName !== '' && this.account.ownerOperation !== ''){
      delete this.account.idAccount;
    console.log(this.account);
    this.apiService.saveAccount(this.account).subscribe(
      (res) => {
        console.log(res);
        this.cleanAccount();
        alert('¡Cuenta almacenada de forma correcta!');
        this.getAccounts();
        this.addAccountFlag = false;
      },
      (err) => {
        console.error(err);
      }
    );
    }else {
      alert('¡Debes completar todos los campos!')
    }
    
  }
  cleanAccount() {
    this.account = {
      idAccount: 0,
      accountName: "",
      clientName: "",
      ownerOperation: "",
      checkAccount: "",
    };
  }

}
