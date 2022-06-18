import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {ISwapRequest} from "../../swapRequests/iswapRequest";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService} from "../../shared/authentication.service";
import {OfferService} from "../../offers/offer.service";
import {Subscription} from "rxjs";
import { interval } from 'rxjs';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  showFiller = false;
  // @ts-ignore
  public isScreenSmall: boolean;
  mySwapRequests: ISwapRequest[] | null = null;
  swapRequestsToMe: ISwapRequest[] | null = null;
  errorMessage: string = '';
  sub!: Subscription;
  sub2!: Subscription;
  // @ts-ignore
  subscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public authenticationService: AuthenticationService,
              private offerService: OfferService) {
  }

  // @ts-ignore
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit(): void {
    this.breakpointObserver
      // .observe([Breakpoints.XSmall])
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches
      })

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });

    const source = interval(5000);
    this.subscription = source.subscribe(val => this.getOffersWithQueryParams());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  private getOffersWithQueryParams() {
    if (this.authenticationService.loggedUserId) {
      console.log('logged: ', this.authenticationService.loggedUserId)
      this.sub = this.offerService.getSwapRequestsByRequesterUserId(this.authenticationService.loggedUserId)
        .subscribe({
          next: offers => {
            if(offers != null) {
              this.mySwapRequests = offers;
            }
          },
          error: error => this.errorMessage = error
        });
      this.sub2 = this.offerService.getSwapRequestsByTargetUserId(this.authenticationService.loggedUserId)
        .subscribe({
          next: offers => {
            if(offers != null) {
              this.swapRequestsToMe = offers;
            }
          },
          error: error => this.errorMessage = error
        });
    }
  }

}
