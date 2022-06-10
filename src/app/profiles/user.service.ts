import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IOffer} from "../offers/ioffer";
import {catchError, tap} from "rxjs/operators";
import {IUser} from "./iuser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "http://localhost:8080/api/profile";

  constructor(private http: HttpClient) {
  }

  getProfile(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.userUrl}/${id}`).pipe(
      tap(data => console.log("getProfile:, ", JSON.stringify(data)),
        catchError(this.handleError))
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
