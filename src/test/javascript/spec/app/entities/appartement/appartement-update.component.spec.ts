import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ConstructionTestModule } from '../../../test.module';
import { AppartementUpdateComponent } from 'app/entities/appartement/appartement-update.component';
import { AppartementService } from 'app/entities/appartement/appartement.service';
import { Appartement } from 'app/shared/model/appartement.model';

describe('Component Tests', () => {
  describe('Appartement Management Update Component', () => {
    let comp: AppartementUpdateComponent;
    let fixture: ComponentFixture<AppartementUpdateComponent>;
    let service: AppartementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConstructionTestModule],
        declarations: [AppartementUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AppartementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppartementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppartementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Appartement(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Appartement();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
