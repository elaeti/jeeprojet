import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ConstructionTestModule } from '../../../test.module';
import { EtageUpdateComponent } from 'app/entities/etage/etage-update.component';
import { EtageService } from 'app/entities/etage/etage.service';
import { Etage } from 'app/shared/model/etage.model';

describe('Component Tests', () => {
  describe('Etage Management Update Component', () => {
    let comp: EtageUpdateComponent;
    let fixture: ComponentFixture<EtageUpdateComponent>;
    let service: EtageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConstructionTestModule],
        declarations: [EtageUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EtageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Etage(123);
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
        const entity = new Etage();
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
