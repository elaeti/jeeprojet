import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConstructionSharedModule } from 'app/shared/shared.module';
import { AppartementComponent } from './appartement.component';
import { AppartementDetailComponent } from './appartement-detail.component';
import { AppartementUpdateComponent } from './appartement-update.component';
import { AppartementDeleteDialogComponent } from './appartement-delete-dialog.component';
import { appartementRoute } from './appartement.route';

@NgModule({
  imports: [ConstructionSharedModule, RouterModule.forChild(appartementRoute)],
  declarations: [AppartementComponent, AppartementDetailComponent, AppartementUpdateComponent, AppartementDeleteDialogComponent],
  entryComponents: [AppartementDeleteDialogComponent],
})
export class ConstructionAppartementModule {}
