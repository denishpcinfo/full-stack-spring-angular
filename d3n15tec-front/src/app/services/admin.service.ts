import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import { AppConstants } from '../app-constants';

const BASE_URL = AppConstants.baseServidor;

const API_ADMIN_URL = `${BASE_URL}/api/admin/`

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  headers() {
    return new HttpHeaders({
      authorization: 'Basic ' + btoa(this.currentUser.username + ':' + this.currentUser.password),
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  delete(userId: number): Observable<any> {
    return this.http.delete(API_ADMIN_URL + userId, {headers: this.headers()});
  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_ADMIN_URL + 'all', {headers: this.headers()});
  }
}
