import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subjects } from './subjects.model';

@Injectable()
export class SubjectsService {

  constructor(private _http: HttpClient) { }

  public post(subject: Subjects): Promise<any> {
    return this._http.post(environment.api + 'api/Subjects', subject).toPromise();
  }

  public get(): Promise<any> {
    return this._http.get(environment.api + 'api/Subjects').toPromise();
  }

  public delete(id: string): Promise<any> {
    return this._http.delete(environment.api + 'api/Subjects/' + id).toPromise();
  }

  public put(subject: Subjects): Promise<any> {
    return this._http.put(environment.api + 'api/Subjects/' + subject.id, subject).toPromise();
  }

}
