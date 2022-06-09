import { TestBed } from '@angular/core/testing';

import { OfferDetailGuard } from './offer-detail.guard';

describe('OfferDetailGuard', () => {
  let guard: OfferDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OfferDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
