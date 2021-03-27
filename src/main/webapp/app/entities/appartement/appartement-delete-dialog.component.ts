import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppartement } from 'app/shared/model/appartement.model';
import { AppartementService } from './appartement.service';

@Component({
  templateUrl: './appartement-delete-dialog.component.html',
})
export class AppartementDeleteDialogComponent {
  appartement?: IAppartement;

  constructor(
    protected appartementService: AppartementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appartementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('appartementListModification');
      this.activeModal.close();
    });
  }
}
