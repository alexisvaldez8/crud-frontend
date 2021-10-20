import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Change } from '../modelos/models';
@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.scss'],
})
export class ChangesComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public change: Change = {
    idChanges: 0,
    idUser: 0,
    computer: '',
    dateStart: '',
    dateEnd: '',
  };
  usersDetail: any;
  public selectDisabled = true;

  checkChange(){
    if(this.change.computer !== ''){
      this.selectDisabled = false
    }
  }

  colores = ['Verde', 'Amarillo', 'Rojo', 'Negro'];
  addChangeFlag: boolean = false;
  public changes: any;

  ngOnInit(): void {
    this.getChanges();
  }
  showChanges() {
    this.addChangeFlag = false;
  }
  addChangeActivate() {
    this.getUsers();
    this.addChangeFlag = true;
  }
  getChanges() {
    this.apiService.getChanges().subscribe(
      async (res) => {
        this.changes = res;
        console.log(this.changes);
      },
      (err) => console.log(err)
    );
  }
  newChange() {
    console.log(this.change);
    if (this.change.computer !== '') {
      delete this.change.idChanges;
      delete this.change.dateStart;
      delete this.change.dateEnd;
      this.apiService.saveChange(this.change).subscribe(
        (res) => {
          console.log(res);
          this.cleanChange();
          alert('¡Cambio almacenado de forma correcta!');
          this.getChanges();
          this.addChangeFlag = false;
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      alert('¡Debes completar los campos!');
    }
  }
  cleanChange() {
    this.change = {
      idChanges: 0,
      idUser: 0,
      computer: '',
      dateStart: '',
      dateEnd: '',
    };
  }
  getUsers() {
    this.apiService.getUsersDetail().subscribe(
      async (res) => {
        this.usersDetail = res;
        console.log(this.usersDetail);
      },
      (err) => console.log(err)
    );
  }
  updateChange() {}
  deleteChange(idChanges: number) {
    console.log(idChanges, '<--usuario a borrar');
    this.apiService.deleteChange(idChanges).subscribe(
      (res) => {
        console.log(res);
        alert('¡Cambio eliminado correctamente!');
        location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
