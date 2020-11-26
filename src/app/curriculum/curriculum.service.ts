import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curriculum } from './curriculum.model';

@Injectable()
export class CurriculumService {

    private readonly _url = '';    

    constructor(private _http: HttpClient) { }

    public post(subject: Curriculum) : Promise<any> {
        return this._http.post(this._url, subject).toPromise();
    }

    public get() : Promise<any> {
        return this._http.get(this._url).toPromise();
    }

    public getId(code: number) : Promise<any> {
        return this._http.get(this._url.concat('/').concat(code.toString())).toPromise();
    }

    public delete(id: number) : Promise<any> {
        return this._http.delete(this._url, { params: new HttpParams().set('id', id.toString()) }).toPromise();
    }

    public put(subject: Curriculum) : Promise<any> {
        return this._http.put(this._url, subject).toPromise();
    }
 
}