import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEtage, Etage } from 'app/shared/model/etage.model';
import { EtageService } from './etage.service';
import { IBatiment } from 'app/shared/model/batiment.model';
import { BatimentService } from 'app/entities/batiment/batiment.service';

@Component({
  selector: 'jhi-etage-update',
  templateUrl: './etage-update.component.html',
})
export class EtageUpdateComponent implements OnInit {
  isSaving = false;
  batiments: IBatiment[] = [];

  editForm = this.fb.group({
    id: [],
    numeroetage: [null, [Validators.required]],
    batiment: [],
  });

  constructor(
    protected etageService: EtageService,
    protected batimentService: BatimentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etage }) => {
      this.updateForm(etage);

      this.batimentService.query().subscribe((res: HttpResponse<IBatiment[]>) => (this.batiments = res.body || []));
    });
  }

  updateForm(etage: IEtage): void {
    this.editForm.patchValue({
      id: etage.id,
      numeroetage: etage.numeroetage,
      batiment: etage.batiment,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etage = this.createFromForm();
    if (etage.id !== undefined) {
      this.subscribeToSaveResponse(this.etageService.update(etage));
    } else {
      this.subscribeToSaveResponse(this.etageService.create(etage));
    }
  }

  private createFromForm(): IEtage {
    return {
      ...new Etage(),
      id: this.editForm.get(['id'])!.value,
      numeroetage: this.editForm.get(['numeroetage'])!.value,
      batiment: this.editForm.get(['batiment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtage>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBatiment): any {
    return item.id;
  }
}
