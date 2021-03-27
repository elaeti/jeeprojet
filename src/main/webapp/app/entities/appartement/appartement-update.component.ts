import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAppartement, Appartement } from 'app/shared/model/appartement.model';
import { AppartementService } from './appartement.service';
import { IEtage } from 'app/shared/model/etage.model';
import { EtageService } from 'app/entities/etage/etage.service';

@Component({
  selector: 'jhi-appartement-update',
  templateUrl: './appartement-update.component.html',
})
export class AppartementUpdateComponent implements OnInit {
  isSaving = false;
  etages: IEtage[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    numeroappart: [],
    etage: [],
  });

  constructor(
    protected appartementService: AppartementService,
    protected etageService: EtageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appartement }) => {
      this.updateForm(appartement);

      this.etageService.query().subscribe((res: HttpResponse<IEtage[]>) => (this.etages = res.body || []));
    });
  }

  updateForm(appartement: IAppartement): void {
    this.editForm.patchValue({
      id: appartement.id,
      name: appartement.name,
      numeroappart: appartement.numeroappart,
      etage: appartement.etage,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appartement = this.createFromForm();
    if (appartement.id !== undefined) {
      this.subscribeToSaveResponse(this.appartementService.update(appartement));
    } else {
      this.subscribeToSaveResponse(this.appartementService.create(appartement));
    }
  }

  private createFromForm(): IAppartement {
    return {
      ...new Appartement(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      numeroappart: this.editForm.get(['numeroappart'])!.value,
      etage: this.editForm.get(['etage'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppartement>>): void {
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

  trackById(index: number, item: IEtage): any {
    return item.id;
  }
}
