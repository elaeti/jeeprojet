import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppartement } from 'app/shared/model/appartement.model';

@Component({
  selector: 'jhi-appartement-detail',
  templateUrl: './appartement-detail.component.html',
})
export class AppartementDetailComponent implements OnInit {
  appartement: IAppartement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appartement }) => (this.appartement = appartement));
  }

  previousState(): void {
    window.history.back();
  }
}
