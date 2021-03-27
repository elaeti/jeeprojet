import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAppartement, Appartement } from 'app/shared/model/appartement.model';
import { AppartementService } from './appartement.service';
import { AppartementComponent } from './appartement.component';
import { AppartementDetailComponent } from './appartement-detail.component';
import { AppartementUpdateComponent } from './appartement-update.component';

@Injectable({ providedIn: 'root' })
export class AppartementResolve implements Resolve<IAppartement> {
  constructor(private service: AppartementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppartement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((appartement: HttpResponse<Appartement>) => {
          if (appartement.body) {
            return of(appartement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Appartement());
  }
}

export const appartementRoute: Routes = [
  {
    path: '',
    component: AppartementComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'constructionApp.appartement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppartementDetailComponent,
    resolve: {
      appartement: AppartementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'constructionApp.appartement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppartementUpdateComponent,
    resolve: {
      appartement: AppartementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'constructionApp.appartement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppartementUpdateComponent,
    resolve: {
      appartement: AppartementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'constructionApp.appartement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
