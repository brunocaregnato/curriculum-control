import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from './Students.model';

@Injectable()
export class StudentsService {

    private readonly _url = '';

    constructor(private _http: HttpClient) { }

    public post(subject: Students) : Promise<any> {
        return this._http.post(this._url, subject).toPromise();
    }

    public get() : Promise<any> {
        return this._http.get(this._url).toPromise();
    }

    public delete(id: number) : Promise<any> {
        return this._http.delete(this._url, { params: new HttpParams().set('id', id.toString()) }).toPromise();
    }

    public put(subject: Students) : Promise<any> {
        return this._http.put(this._url, subject).toPromise();
    }
 
}