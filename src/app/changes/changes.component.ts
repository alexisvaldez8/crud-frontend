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
  public changeUpd: Change = {
    idChanges: 0,
    idUser: 0,
    computer: '',
    dateStart: '',
    dateEnd: '',
  };
  usersDetail: any;
  public selectDisabled = true;
  public filter = 'Email';
  public filterValue = '';

  public filters = ['Email', 'Equipo', 'Fecha inicio', 'Fecha fin'];

  checkChange() {
    if (this.change.computer !== '') {
      this.selectDisabled = false;
    }
  }

  colores = ['Verde', 'Amarillo', 'Rojo', 'Negro'];
  addChangeFlag: boolean = false;
  updateChangeFlag: boolean = false;
  addNewChangeFlag: boolean = false;
  clearAllFilters: boolean = false;
  public changes: any;
  public changeUpdate: any;
  public changeUpdateId: any;

  ngOnInit(): void {
    this.getChanges();
  }
  showChanges() {
    this.addChangeFlag = false;
    this.updateChangeFlag = false;
    this.addNewChangeFlag = false;
  }
  addChangeActivate() {
    this.getUsers();
    this.addChangeFlag = true;
    this.addNewChangeFlag = true;
  }
  getChanges() {
    this.apiService.getChanges().subscribe(
      async (res) => {
        this.changes = res;
        console.log(this.changes);
      },
      (err) => console.log(err)
    );
    this.clearAllFilters = false;
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
  updateChangeFlagActivate() {
    this.updateChangeFlag = true;
    this.addChangeFlag = true;
  }
  updateChange() {
    console.log(this.changeUpd);
    if (confirm('¿Seguro que desea actualizar este movimiento?')) {
      this.apiService
        .updateChange(this.changeUpd.idChanges, this.changeUpd)
        .subscribe(
          async (res) => {
            console.log(res);
            alert('¡Movimiento actualizado de forma exitosa!');
            this.getChanges();
            this.updateChangeFlag = false;
            this.addChangeFlag = false;
          },
          (err) => console.log(err)
        );
    }
  }
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

  filtrar(filter: any, value: any) {
    this.clearAllFilters = true;
    console.log(filter);
    switch (filter) {
      case 'Email':
        this.apiService.filterByEmail(value).subscribe(
          async (res) => {
            this.changes = res;
            console.log(this.changes);
          },
          (err) => console.log(err)
        );
        break;
      case 'Equipo':
        this.apiService.filterByComputer(value).subscribe(
          async (res) => {
            this.changes = res;
            console.log(this.changes);
          },
          (err) => console.log(err)
        );
        break;
      case 'Fecha inicio':
        this.apiService.filterByDateStart(value).subscribe(
          async (res) => {
            this.changes = res;
            console.log(this.changes);
          },
          (err) => console.log(err)
        );
        break;
      case 'Fecha fin':
        this.apiService.filterByDateEnd(value).subscribe(
          async (res) => {
            this.changes = res;
            console.log(this.changes);
          },
          (err) => console.log(err)
        );
        break;
    }
  }
  getChangeToUpdate(id: any) {
    this.apiService.filterByid(id).subscribe(
      async (res) => {
        this.changeUpdate = res;
        this.changeUpd.computer = this.changeUpdate[0].computer;
        this.changeUpd.idUser = this.changeUpdate[0].idUser;
        this.changeUpd.dateEnd = this.changeUpdate[0].dateEnd;
        this.changeUpd.dateStart = this.changeUpdate[0].dateStart;
        this.changeUpd.idChanges = this.changeUpdate[0].idChanges;
        console.log(this.changeUpdate);
      },
      (err) => console.log(err)
    );
  }
}
