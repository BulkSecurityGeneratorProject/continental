import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { OperationsMt } from './operations-mt.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OperationsMtService {

    private resourceUrl = 'api/operations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(operations: OperationsMt): Observable<OperationsMt> {
        const copy = this.convert(operations);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(operations: OperationsMt): Observable<OperationsMt> {
        const copy = this.convert(operations);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<OperationsMt> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.dateOperation = this.dateUtils
            .convertLocalDateFromServer(entity.dateOperation);
    }

    private convert(operations: OperationsMt): OperationsMt {
        const copy: OperationsMt = Object.assign({}, operations);
        copy.dateOperation = this.dateUtils
            .convertLocalDateToServer(operations.dateOperation);
        return copy;
    }
}
