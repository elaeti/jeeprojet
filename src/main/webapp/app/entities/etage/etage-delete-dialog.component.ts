import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtage } from 'app/shared/model/etage.model';
import { EtageService } from './etage.service';

@Component({
  templateUrl: './etage-delete-dialog.component.html',
})
export class EtageDeleteDialogComponent {
  etage?: IEtage;

  constructor(protected etageService: EtageService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('etageListModification');
      this.activeModal.close();
    });
  }
}
