import {Injectable} from "@angular/core";
import {IOffer} from "./offer";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private backendAddress = "localhost:4200" //localhost address of the backend (update accordingly to your server address)
  // private offersUrl = this.backendAddress + "/offers"; //uncomment this line and comment the next line in order to retrieve data from backend
  private offersUrl = "api/offers/offers.json"; //mocked URL address in order load data from file

  constructor(private http: HttpClient) { }

  getOffers(): Observable<IOffer[]> {
    return this.http.get<IOffer[]>(this.offersUrl).pipe(
      tap(data => console.log("All data:, ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      //A client side or network error occured
      errorMessage = `An error occurred: ${error.error.message}`;
    }
    else {
      //The backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
