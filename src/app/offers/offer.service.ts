import {Injectable} from "@angular/core";
import {IOffer} from "./ioffer";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Offer} from "./offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private backendAddress = "localhost:5200" //localhost address of the backend (update accordingly to your server address)
  private offersUrl = "http://localhost:8080/api/offers";
  private offerUrl = "http://localhost:8080/api/offers";

  constructor(private http: HttpClient) {
  }

  getOffers(): Observable<IOffer[]> {
    console.log(this.offersUrl);
    return this.http.get<IOffer[]>(this.offersUrl)
      .pipe(
        tap(data => console.log("getOffers():, ", JSON.stringify(data)),
          catchError(this.handleError))
      );
  }

  getOffer(id: number): Observable<IOffer> {
    return this.http.get<IOffer>(`${this.offerUrl}/${id}`).pipe(
      tap(data => console.log("Selected offer data:, ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  updateOffer(offer: IOffer): Observable<IOffer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.offerUrl}/${offer.id}`;
    return this.http.put(url, offer, {headers: headers})
      .pipe(
        tap(() => console.log('updateOffer: ' + offer.toy.toyName)),
        map(() => offer),
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
