import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  pageTitle: string = "Product Detail";

  constructor() { }

  ngOnInit(): void {
  }

}
