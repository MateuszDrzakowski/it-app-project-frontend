import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IOffer} from "../offers/ioffer";
import {catchError, tap} from "rxjs/operators";
import {IUser} from "./iuser";
import {ConfigurationURLService} from "../shared/configurationURL";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = this.configurationURLService.userProfileUrl;

  constructor(private http: HttpClient, private configurationURLService: ConfigurationURLService) {
  }

  getProfile(id: number): Observable<IUser> {
    const requestUrl = `${this.userUrl}/${id}`;

    console.log(`getProfile() REQUEST URL: ${requestUrl}`);
    return this.http.get<IUser>(`${this.userUrl}/${id}`).pipe(
      tap(data => console.log("getProfile() RESPONSE: ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //A client side or network error occured
      errorMessage = `A client side or network error occured: ${error.error.message}`;
    } else {
      //The backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
