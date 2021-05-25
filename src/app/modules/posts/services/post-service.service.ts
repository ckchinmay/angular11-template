import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Post } from '../models/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  // Base url
  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // POST
  createPost(data: Post): Observable<Post> {
    return this.http.post<Post>(this.baseurl + '/posts/', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // GET
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.baseurl + '/posts/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // GET
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseurl + '/posts/')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  getPostsList(): Observable<any> {
    return this.http.get(this.baseurl + '/posts/')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // PUT
  updatePost(id: number, data: Post): Observable<Post> {
    return this.http.put<Post>(this.baseurl + '/posts/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // DELETE
  deletePost(id: number) {
    return this.http.delete<Post>(this.baseurl + '/posts/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}