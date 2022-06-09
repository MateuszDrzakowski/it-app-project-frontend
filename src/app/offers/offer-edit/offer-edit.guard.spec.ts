import { TestBed } from '@angular/core/testing';

import { OfferEditGuard } from './offer-edit.guard';

describe('OfferEditGuard', () => {
  let guard: OfferEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OfferEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
