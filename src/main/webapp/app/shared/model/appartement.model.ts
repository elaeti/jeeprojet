import { IEtage } from 'app/shared/model/etage.model';

export interface IAppartement {
  id?: number;
  name?: string;
  numeroappart?: number;
  etage?: IEtage;
}

export class Appartement implements IAppartement {
  constructor(public id?: number, public name?: string, public numeroappart?: number, public etage?: IEtage) {}
}
