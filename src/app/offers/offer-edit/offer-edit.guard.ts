import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {OfferEditComponent} from "./offer-edit.component";

@Injectable({
  providedIn: 'root'
})
export class OfferEditGuard implements CanActivate, CanDeactivate<OfferEditComponent> {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  canDeactivate(component: OfferEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    // if(component.offerForm.dirty) {
      // const offer = component.offerForm.get('toyName').value;
    if (component.offerFormGroup.dirty)
      return confirm('Navigate away and lose all changes made to form?')
    else
      return true;

    // }
    // return true;
  }


}
