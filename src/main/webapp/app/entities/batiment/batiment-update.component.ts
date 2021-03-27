import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBatiment, Batiment } from 'app/shared/model/batiment.model';
import { BatimentService } from './batiment.service';

@Component({
  selector: 'jhi-batiment-update',
  templateUrl: './batiment-update.component.html',
})
export class BatimentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected batimentService: BatimentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ batiment }) => {
      this.updateForm(batiment);
    });
  }

  updateForm(batiment: IBatiment): void {
    this.editForm.patchValue({
      id: batiment.id,
      name: batiment.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const batiment = this.createFromForm();
    if (batiment.id !== undefined) {
      this.subscribeToSaveResponse(this.batimentService.update(batiment));
    } else {
      this.subscribeToSaveResponse(this.batimentService.create(batiment));
    }
  }

  private createFromForm(): IBatiment {
    return {
      ...new Batiment(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBatiment>>): void {
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
}
