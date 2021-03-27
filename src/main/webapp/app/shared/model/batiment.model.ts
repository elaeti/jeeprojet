import { IEtage } from 'app/shared/model/etage.model';

export interface IBatiment {
  id?: number;
  name?: string;
  etages?: IEtage[];
}

export class Batiment implements IBatiment {
  constructor(public id?: number, public name?: string, public etages?: IEtage[]) {}
}
