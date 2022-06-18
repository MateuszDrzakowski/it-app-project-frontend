import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IOffer} from "../offers/ioffer";
import {catchError, tap} from "rxjs/operators";
import {IAuth} from "./iauth";
import {ConfigurationURLService} from "./configurationURL";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //mocked backend:
  // public backendAddress = "http://localhost:8080/api/" //localhost address of the backend (update accordingly to your server address)
  //real backend:
  public backendAddress = "localhost:5200/" //localhost address of the backend (update accordingly to your server address)
  public loginUrl = this.backendAddress + "login";
  public logoutUrl = this.backendAddress + "logout";
  public loggedUser: IAuth | null = null;
  public loggedUserId: number | null = null;

  constructor(private http: HttpClient,
              private router: Router,
              private configurationURLService: ConfigurationURLService) {
  }

  login(username: string | null, password: string | null): Observable<IAuth[]> {

    let params = new HttpParams();
    if (username != null) {
      params = params.append('username', username);
    }
    if (password != null) {
      params = params.append('password', password);
    }
    return this.http.get<IAuth[]>(this.loginUrl, {params: params})
      .pipe(
        tap(data => {
            console.log("login():, ", JSON.stringify(data));
            if (data.length != 0) {
              this.loggedUser = data[0];
              this.loggedUserId = this.loggedUser.id;
            } else {
              this.loggedUser = null;
              this.loggedUserId = null;
            }
          }
          ,
          catchError(this.handleError))
      );
  }

  logout(): Observable<any> {
    return this.http.get<Number>(this.logoutUrl)
      .pipe(
        tap(data =>
            console.log("logout():, ", JSON.stringify(data)),
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
