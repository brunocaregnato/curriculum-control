import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curriculum } from './curriculum.model';

@Injectable()
export class CurriculumService {


    constructor(private _http: HttpClient) { }

    public post(curriculum: Curriculum): Promise<any> {
      return this._http.post(environment.api + 'api/Curriculums', curriculum).toPromise();
    }

    public get(): Promise<any> {
      return this._http.get(environment.api + 'api/Curriculums').toPromise();
    }

    public delete(id: string): Promise<any> {
      return this._http.delete(environment.api + 'api/Curriculums/' + id).toPromise();
    }

    public put(curriculum: Curriculum): Promise<any> {
      return this._http.put(environment.api + 'api/Curriculums/' + curriculum.id, curriculum).toPromise();
    }

    public getId(id: string) : Promise<any> {
        return this._http.get(environment.api + 'api/Curriculums/' + id).toPromise();
    }



}
