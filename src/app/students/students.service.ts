import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from './students.model';

@Injectable()
export class StudentsService {

    constructor(private _http: HttpClient) { }

    public post(subject: Students) : Promise<any> {
        return this._http.post(environment.api + 'api/Users', subject).toPromise();
    }

    public get() : Promise<any> {
        return this._http.get(environment.api + 'api/Users').toPromise();
    }

    public delete(id: string) : Promise<any> {
        return this._http.delete(environment.api + 'api/Users/'+id).toPromise();
    }

    public put(subject: Students) : Promise<any> {
        return this._http.put(environment.api + 'api/Users/' + subject.id, subject).toPromise();
    }

}
