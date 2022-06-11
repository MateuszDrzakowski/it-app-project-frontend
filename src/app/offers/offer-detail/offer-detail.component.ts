import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IOffer} from "../ioffer";
import {OfferService} from "../offer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  pageTitle: string = "Offer Detail";
  offer: IOffer | undefined;
  sub!: Subscription;
  errorMessage: string = '';
  userId: number | null = null;
  imageWidth: number = 300;
  imageMargin: number = 2;

  constructor(private route: ActivatedRoute,
              private offerService: OfferService,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;

    this.sub = this.getOffer(id);
  }

  private getOffer(id: number) {
    return this.offerService.getOffer(id).subscribe({
      next: offerData => {
        this.offer = offerData;
        this.userId = offerData.userId;
        console.log(this.offer)
      },
      error: error => this.errorMessage = error
    });
  }

  onBack(): void {
    this.router.navigate(['/offers'])
  }

}
