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
    const requestUrl = this.offersUrl;
    console.log(`getOffers() REQUEST URL: ${requestUrl}`);
    return this.http.get<IOffer[]>(requestUrl)
      .pipe(
        tap(data => console.log("getOffers() RESPONSE: ", JSON.stringify(data)),
          catchError(this.handleError))
      );
  }

  getOffer(id: number): Observable<IOffer> {
    const requestUrl = `${this.offerUrl}/${id}`;
    console.log(`getOffer() REQUEST URL: ${requestUrl}`);
    return this.http.get<IOffer>(requestUrl).pipe(
      tap(data => console.log(`getOffer() with id:${id} RESPONSE: `, JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  getSwapRequest(id: number): Observable<ISwapRequest> {
    const requestUrl = `${this.swapRequestsUrl}/${id}`;
    console.log(`getSwapRequest() REQUEST URL: ${requestUrl}`);
    return this.http.get<ISwapRequest>(`${this.swapRequestsUrl}/${id}`).pipe(
      tap(data => console.log("getSwapRequest RESPONSE: ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  getOffersWithQueryParams(city: string | null, ageMin: number | null, offerType: string | null,
                          price: number | null, deliveryOption: string | null, userId: number | null): Observable<IOffer[]> {
    const requestUrl = this.offersUrl;
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
    console.log(`getOffersWithQueryParams() REQUEST URL: ${requestUrl}`);
    console.log(`getOffersWithQueryParams() REQUEST QUERY PARAMS: ${JSON.stringify(params)}`);
    return this.http.get<IOffer[]>(requestUrl, {params: params}).pipe(
      tap(data => console.log("getOffersWithQueryParams() RESPONSE: ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  getSwapRequestsByRequesterUserId(userId: number | null): Observable<ISwapRequest[]> {
    const requestUrl = this.swapRequestsUrl;
    let params = new HttpParams();
    if(userId != null) {
      params = params.append('requesterUserId', userId);
    }
    return this.http.get<ISwapRequest[]>(requestUrl, {params: params}).pipe(
      tap(data => console.log("getSwapRequestsWithQueryParams():, ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  getSwapRequestsByTargetUserId(userId: number | null): Observable<ISwapRequest[]> {
    const requestUrl = this.swapRequestsUrl;
    let params = new HttpParams();
    if(userId != null) {
      params = params.append('targetUserId', userId);
    }
    console.log(`getSwapRequestsByTargetUserId() REQUEST URL: ${requestUrl}`);
    console.log(`getSwapRequestsByTargetUserId() REQUEST QUERY PARAMS: ${JSON.stringify(params)}`);
    return this.http.get<ISwapRequest[]>(requestUrl, {params: params}).pipe(
      tap(data => console.log("getSwapRequestsWithQueryParams() RESPONSE: ", JSON.stringify(data)),
        catchError(this.handleError))
    );
  }

  updateOffer(offer: IOffer): Observable<IOffer> {
    const requestUrl = `${this.offerUrl}/${offer.id}`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(`updateOffer() REQUEST URL: ${requestUrl}`);
    console.log(`updateOffer() BODY:`, JSON.stringify(offer));
    return this.http.put(requestUrl, offer, {headers: headers})
      .pipe(
        tap(data => console.log('updateOffer RESPONSE: ', data)),
        map(() => offer),
        catchError(this.handleError)
      );
  }

  saveOffer(offer: IOffer): Observable<IOffer> {
    const requestUrl = this.offerUrl;
    console.log(`saveOffer() REQUEST URL: ${requestUrl}`);
    console.log(`saveOffer() BODY:`, JSON.stringify(offer));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IOffer>(requestUrl, offer, {headers: headers})
      .pipe(
        tap(data => console.log('saveOffer() RESPONSE: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateSwapRequest(swapRequest: ISwapRequest): Observable<ISwapRequest> {
    const requestUrl = `${this.swapRequestsUrl}/${swapRequest.id}`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(`updateSwapRequest() REQUEST URL: ${requestUrl}`);
    console.log(`updateSwapRequest() BODY:`, JSON.stringify(swapRequest));
    return this.http.put(requestUrl, swapRequest, {headers: headers})
      .pipe(
        tap(data => console.log('updateSwapRequest() RESPONSE: ', JSON.stringify(data))),
        map(() => swapRequest),
        catchError(this.handleError)
      );
  }

  saveSwapRequest(swapRequest: ISwapRequest): Observable<ISwapRequest> {
    const requestUrl = this.swapRequestsUrl;
    console.log(`saveSwapRequest() REQUEST URL: ${requestUrl}`);
    console.log(`saveSwapRequest() BODY:`, JSON.stringify(swapRequest));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ISwapRequest>(requestUrl, swapRequest, {headers: headers})
      .pipe(
        tap(data => console.log('saveSwapRequest() RESPONSE: ', JSON.stringify(data))),
        catchError(this.handleError)
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

  deleteOffer(id: number | null): Observable<{}> {
    const requestUrl = `${this.offerUrl}/${id}`;
    console.log(`deleteOffer() REQUEST URL: ${requestUrl}`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<IOffer>(requestUrl, {headers: headers})
      .pipe(
        tap(data => console.log('deleteOffer() RESPONSE: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteSwapRequest(id: number | null): Observable<{}> {
    const requestUrl = `${this.swapRequestsUrl}/${id}`;
    console.log(`deleteOffer() REQUEST URL: ${requestUrl}`);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<IOffer>(requestUrl, {headers: headers})
      .pipe(
        tap(data => console.log('deleteSwapRequest() RESPONSE: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
}
