import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEtage, Etage } from 'app/shared/model/etage.model';
import { EtageService } from './etage.service';
import { EtageComponent } from './etage.component';
import { EtageDetailComponent } from './etage-detail.component';
import { EtageUpdateComponent } from './etage-update.component';

@Injectable({ providedIn: 'root' })
export class EtageResolve implements Resolve<IEtage> {
  constructor(private service: EtageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((etage: HttpResponse<Etage>) => {
          if (etage.body) {
            return of(etage.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Etage());
  }
}

export const etageRoute: Routes = [
  {
    path: '',
    component: EtageComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'constructionApp.etage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EtageDetailComponent,
    resolve: {
      etage: EtageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'constructionApp.etage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EtageUpdateComponent,
    resolve: {
      etage: EtageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'constructionApp.etage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EtageUpdateComponent,
    resolve: {
      etage: EtageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'constructionApp.etage.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
