import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtage } from 'app/shared/model/etage.model';

@Component({
  selector: 'jhi-etage-detail',
  templateUrl: './etage-detail.component.html',
})
export class EtageDetailComponent implements OnInit {
  etage: IEtage | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etage }) => (this.etage = etage));
  }

  previousState(): void {
    window.history.back();
  }
}
