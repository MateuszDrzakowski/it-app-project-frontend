import {Injectable} from "@angular/core";
import {IOffer} from "./ioffer";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {ISwapRequest} from "../swapRequests/iswapRequest";
import {ConfigurationURLService} from "../shared/configurationURL";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private offersUrl = this.configurationURLService.offersUrl;
  private offerUrl = this.configurationURLService.offerUrl;
  private swapRequestsUrl = this.configurationURLService.swapRequestsUrl;

  constructor(private http: HttpClient, private configurationURLService: ConfigurationURLService) {
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

  getSwapRequest(id: number): Observable<ISwapRequest> {
    return this.http.get<ISwapRequest>(`${this.swapRequestsUrl}/${id}`).pipe(
      tap(data => console.log("getSwapRequest: ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  getOffersWithQueryParams(city: string | null, ageMin: number | null, offerType: string | null,
                          price: number | null, deliveryOption: string | null, userId: number | null): Observable<IOffer[]> {
    let params = new HttpParams();
    if(city != null) {
      params = params.append('city', city);
    }
    if(ageMin != null) {
      params = params.append('ageMinimum', ageMin);
    }
    if(offerType != null) {
      params = params.append('offerType', offerType);
    }
    if(price != null) {
      params = params.append('price', price);
    }
    if(deliveryOption != null) {
      params = params.append('delivery_option', deliveryOption);
    }
    if(userId != null) {
      params = params.append('userId', userId);
    }
    return this.http.get<IOffer[]>(this.offerUrl, {params: params}).pipe(
      tap(data => console.log("getOffersWithQueryParams():, ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  getSwapRequestsByRequesterUserId(userId: number | null): Observable<ISwapRequest[]> {
    let params = new HttpParams();
    if(userId != null) {
      params = params.append('requesterUserId', userId);
      // params = params.append('targetUserId', userId);
    }
    return this.http.get<ISwapRequest[]>(this.swapRequestsUrl, {params: params}).pipe(
      tap(data => console.log("getSwapRequestsWithQueryParams():, ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  getSwapRequestsByTargetUserId(userId: number | null): Observable<ISwapRequest[]> {
    let params = new HttpParams();
    if(userId != null) {
      params = params.append('targetUserId', userId);
      // params = params.append('targetUserId', userId);
    }
    return this.http.get<ISwapRequest[]>(this.swapRequestsUrl, {params: params}).pipe(
      tap(data => console.log("getSwapRequestsWithQueryParams():, ", JSON.stringify(data)),
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

  saveOffer(offer: IOffer): Observable<IOffer> {
    console.log('saveOffer passed object: ' + JSON.stringify(offer))
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.offerUrl;
    return this.http.post<IOffer>(url, offer, {headers: headers})
      .pipe(
        tap(data => console.log('saveOffer returned object: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateSwapRequest(swapRequest: ISwapRequest): Observable<ISwapRequest> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.swapRequestsUrl}/${swapRequest.id}`;
    return this.http.put(url, swapRequest, {headers: headers})
      .pipe(
        tap(() => console.log('updateSwapRequest: ' + swapRequest)),
        map(() => swapRequest),
        catchError(this.handleError)
      );
  }

  saveSwapRequest(swapRequest: ISwapRequest): Observable<ISwapRequest> {
    console.log('saveSwapRequest passed object: ' + JSON.stringify(swapRequest))
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.swapRequestsUrl;
    return this.http.post<ISwapRequest>(url, swapRequest, {headers: headers})
      .pipe(
        tap(data => console.log('saveSwapRequest returned object: ' + JSON.stringify(data))),
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

  deleteOffer(id: number | null): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.offerUrl}/${id}`;
    return this.http.delete<IOffer>(url, {headers: headers})
      .pipe(
        tap(data => console.log('deleteOffer: ' + id)),
        catchError(this.handleError)
      );
  }

  deleteSwapRequest(id: number | null): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.swapRequestsUrl}/${id}`;
    return this.http.delete<IOffer>(url, {headers: headers})
      .pipe(
        tap(data => console.log('deleteSwapRequest: ' + id)),
        catchError(this.handleError)
      );
  }
}
