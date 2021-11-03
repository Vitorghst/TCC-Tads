import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url = 'http://localhost:3000';
  options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  public login(params: { user: string, password: string }): Observable<any> {
    return this.http.get(this.url + '/users?user=' + params.user, this.options)
  }
  
}
