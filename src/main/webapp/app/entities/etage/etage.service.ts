import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEtage } from 'app/shared/model/etage.model';

type EntityResponseType = HttpResponse<IEtage>;
type EntityArrayResponseType = HttpResponse<IEtage[]>;

@Injectable({ providedIn: 'root' })
export class EtageService {
  public resourceUrl = SERVER_API_URL + 'api/etages';

  constructor(protected http: HttpClient) {}

  create(etage: IEtage): Observable<EntityResponseType> {
    return this.http.post<IEtage>(this.resourceUrl, etage, { observe: 'response' });
  }

  update(etage: IEtage): Observable<EntityResponseType> {
    return this.http.put<IEtage>(this.resourceUrl, etage, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEtage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
