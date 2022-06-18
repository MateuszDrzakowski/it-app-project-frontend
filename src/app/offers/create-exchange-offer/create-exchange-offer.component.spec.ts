import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExchangeOfferComponent } from './create-exchange-offer.component';

describe('CreateExchangeOfferComponent', () => {
  let component: CreateExchangeOfferComponent;
  let fixture: ComponentFixture<CreateExchangeOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExchangeOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExchangeOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
