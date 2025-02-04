import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutEventsComponent } from './checkout-events.component';

describe('CheckoutEventsComponent', () => {
  let component: CheckoutEventsComponent;
  let fixture: ComponentFixture<CheckoutEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutEventsComponent]
    });
    fixture = TestBed.createComponent(CheckoutEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
