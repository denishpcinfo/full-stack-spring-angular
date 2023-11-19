import { Injectable } from '@angular/core';
import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Book} from "../models/book.model";
import {Observable} from "rxjs";
import { AppConstants } from '../app-constants';

const BASE_URL = AppConstants.baseServidor;

const API_URL = `${BASE_URL}/api/book`;

@Injectable({
  providedIn: 'root'
})
export class BookService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  saveBook(book: Book): Observable<any> {
    return this.http.post(API_URL, book, {headers: this.getHeaders});
  }

  deleteBook(book: Book): Observable<any> {
    return this.http.delete( `${API_URL}/${book.id}`, {headers: this.getHeaders});
  }

  getAllBooks(): Observable<any> {
    return this.http.get(API_URL);
  }
}
