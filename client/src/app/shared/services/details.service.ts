import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';

@Injectable()
export class DetailsService {

  constructor(private http: HttpClient) { }

  getUsers(): any {
    console.log('GET all users');
    return this.http.get(environment.base_url + '/users/', )
    .map(this.extractData)
    .catch(this.handleError);
  }

  addUser(newUser) {
    const headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + '/users/new', newUser, {headers: headers})
        .map(this.extractData)
        .catch(this.handleError);
  }

  deleteUser(id) {
    return this.http.delete(environment.base_url + '/users/' + id)
        .map(this.extractData)
        .catch(this.handleError);
  }

  updateUser(user) {
    const headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.base_url + '/users/' + user.id , user, {headers: headers})
        .map(this.extractData)
        .catch(this.handleError);
  }

  public extractData(res: Response) {
    return res || [];
  }

  public handleError(error: any) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error, something went wrong';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  // fetchCurrent(item) {
  //   console.log('feteched at service');
  //   this.currentItem.next(item);
  // }

  // getCurrent(): Observable<any> {
  //   return this.currentItem.asObservable();
  // }
}
