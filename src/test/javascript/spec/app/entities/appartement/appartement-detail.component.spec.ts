import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConstructionTestModule } from '../../../test.module';
import { AppartementDetailComponent } from 'app/entities/appartement/appartement-detail.component';
import { Appartement } from 'app/shared/model/appartement.model';

describe('Component Tests', () => {
  describe('Appartement Management Detail Component', () => {
    let comp: AppartementDetailComponent;
    let fixture: ComponentFixture<AppartementDetailComponent>;
    const route = ({ data: of({ appartement: new Appartement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConstructionTestModule],
        declarations: [AppartementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AppartementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppartementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load appartement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appartement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
