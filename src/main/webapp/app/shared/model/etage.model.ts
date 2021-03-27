import { IAppartement } from 'app/shared/model/appartement.model';
import { IBatiment } from 'app/shared/model/batiment.model';

export interface IEtage {
  id?: number;
  numeroetage?: number;
  appartements?: IAppartement[];
  batiment?: IBatiment;
}

export class Etage implements IEtage {
  constructor(public id?: number, public numeroetage?: number, public appartements?: IAppartement[], public batiment?: IBatiment) {}
}
