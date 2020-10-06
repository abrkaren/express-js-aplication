import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  postCommits(data): Observable<any> {
    return this.http.post<any>('/api/commits', data)
  }

  getAllRepositoryCommits(): Observable<any> {
    return this.http.get<any>('/api/commits')
  }

}
