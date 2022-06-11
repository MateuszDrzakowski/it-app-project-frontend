import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IOffer} from "../offers/ioffer";
import {catchError, tap} from "rxjs/operators";
import {IComment} from "./icomment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = "http://localhost:8080/api/comment";

  constructor(private http: HttpClient) {
  }

  getCommentsOfUser(userId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.commentUrl}?targetUserId=${userId}`)
      .pipe(
        tap(data => console.log("getCommentsOfUser():, ", JSON.stringify(data)),
          catchError(this.handleError))
      );
  }

  saveComment(comment: IComment): Observable<IComment> {
    console.log('saveComment passed object: ' + JSON.stringify(comment))
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IComment>(this.commentUrl, comment, {headers: headers})
      .pipe(
        tap(data => console.log('saveComment returned object: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteComment(id: number | null): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.commentUrl}/${id}`;
    return this.http.delete<IComment>(url, {headers: headers})
      .pipe(
        tap(data => console.log('deleteComment: ' + id)),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //A client side or network error occured
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      //The backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
