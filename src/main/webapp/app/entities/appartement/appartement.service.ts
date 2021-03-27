import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppartement } from 'app/shared/model/appartement.model';

type EntityResponseType = HttpResponse<IAppartement>;
type EntityArrayResponseType = HttpResponse<IAppartement[]>;

@Injectable({ providedIn: 'root' })
export class AppartementService {
  public resourceUrl = SERVER_API_URL + 'api/appartements';

  constructor(protected http: HttpClient) {}

  create(appartement: IAppartement): Observable<EntityResponseType> {
    return this.http.post<IAppartement>(this.resourceUrl, appartement, { observe: 'response' });
  }

  update(appartement: IAppartement): Observable<EntityResponseType> {
    return this.http.put<IAppartement>(this.resourceUrl, appartement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppartement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppartement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
