import { TestBed, getTestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Account, Change, User } from '../modelos/models';

describe('ApiService', () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an User login', () => {
    const dummyUser: User[] = [
      {
        idUser: 1,
        email: 'edgaralexism8@gmail.com',
        englishLevel: 'B1',
        knowledge: 'Angular',
        cv: 'http://google.drive.com/',
        role: 'normal',
        password: '63a9f0ea7bb98050796b649e85481845',
      },
    ];
    service.getLogin(dummyUser[0].email, dummyUser[0].password).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });
  });

  it('should return an User', () => {
    const dummyUser: User[] = [
      {
        idUser: 1,
        email: 'ejemplo@gmail.com',
        englishLevel: 'B1',
        knowledge: 'Angular',
        cv: 'http://google.drive.com/',
        role: 'normal',
        password: '12345',
      },
    ];
    service.getUsersDetail().subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });
  });

  it('should return Accounts', () => {
    const accountTest: Account[] = [
      {
        idAccount: 1,
        accountName: 'Tecnologia',
        clientName: 'Microsoft',
        ownerOperation: 'Edgar Alexis Mercado Valdez',
        checkAccount: 'done',
      },
    ];
    service.getAccounts().subscribe((account) => {
      expect(account).toEqual(accountTest);
    });
  });

  it('should return Accounts', () => {
    const changeTest: Change[] = [
      {
        idChanges: 1,
        idUser: 1,
        computer: 'Asus ZenBook',
        dateStart: '2021-10-11',
        dateEnd: ''
      },
    ];
    service.getAccounts().subscribe((change) => {
      expect(change).toEqual(changeTest);
    });
  });






});
