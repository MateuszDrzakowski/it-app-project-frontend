import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOfferListComponent } from './user-offer-list.component';

describe('UserOfferListComponent', () => {
  let component: UserOfferListComponent;
  let fixture: ComponentFixture<UserOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOfferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
