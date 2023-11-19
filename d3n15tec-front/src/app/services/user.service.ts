import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
import {map} from 'rxjs/operators';
import { AppConstants } from '../app-constants';

const BASE_URL = AppConstants.baseServidor;

const API_URL = `${BASE_URL}/api/user/`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setHeaders() {
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUserSubject.value.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {

    const headers = new HttpHeaders(
      user ? {
        authorization:'Basic ' + btoa(user.username + ':' + user.password)
      } : {}
    );

    return this.http.get<any> (API_URL + "login", {headers:headers}).pipe(
      map(response =>{

        if(response){
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  logOut(): Observable<any> {
    return this.http.post(API_URL + "logout", {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        
      })
    );
  }

  register(user: User): Observable<any> {

    return this.http.post(API_URL + "registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  changeRole(username: string, role: Role): Observable<any> {
    return this.http.put(`${API_URL}${username}/change/${role}`, {});
  }


  userAutenticado() {
    if (localStorage.getItem('currentUser') !== null) {
      return true;
    } else {
      return false;
    }
  }
}
