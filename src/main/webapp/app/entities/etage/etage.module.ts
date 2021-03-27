import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConstructionSharedModule } from 'app/shared/shared.module';
import { EtageComponent } from './etage.component';
import { EtageDetailComponent } from './etage-detail.component';
import { EtageUpdateComponent } from './etage-update.component';
import { EtageDeleteDialogComponent } from './etage-delete-dialog.component';
import { etageRoute } from './etage.route';

@NgModule({
  imports: [ConstructionSharedModule, RouterModule.forChild(etageRoute)],
  declarations: [EtageComponent, EtageDetailComponent, EtageUpdateComponent, EtageDeleteDialogComponent],
  entryComponents: [EtageDeleteDialogComponent],
})
export class ConstructionEtageModule {}
