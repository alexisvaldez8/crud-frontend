export interface User{
    idUser?: number;
    email: string;
    englishLevel: string;
    knowledge: string;
    cv: string;
}
export interface Account{
    idAccount?: number;
    accountName: string;
    clientName: string;
    ownerOperation: string;
    checkAccount: string;
}
export interface Change{
    idChanges?: number;
    idUser: number;
    computer: string;
    dateStart?: string;
    dateEnd?: string;
}