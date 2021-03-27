import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'batiment',
        loadChildren: () => import('./batiment/batiment.module').then(m => m.ConstructionBatimentModule),
      },
      {
        path: 'appartement',
        loadChildren: () => import('./appartement/appartement.module').then(m => m.ConstructionAppartementModule),
      },
      {
        path: 'etage',
        loadChildren: () => import('./etage/etage.module').then(m => m.ConstructionEtageModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ConstructionEntityModule {}
