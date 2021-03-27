import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConstructionTestModule } from '../../../test.module';
import { EtageDetailComponent } from 'app/entities/etage/etage-detail.component';
import { Etage } from 'app/shared/model/etage.model';

describe('Component Tests', () => {
  describe('Etage Management Detail Component', () => {
    let comp: EtageDetailComponent;
    let fixture: ComponentFixture<EtageDetailComponent>;
    const route = ({ data: of({ etage: new Etage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConstructionTestModule],
        declarations: [EtageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EtageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EtageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load etage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.etage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
