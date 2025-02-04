import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutLocalsComponent } from './checkout-locals.component';

describe('CheckoutLocalsComponent', () => {
  let component: CheckoutLocalsComponent;
  let fixture: ComponentFixture<CheckoutLocalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutLocalsComponent]
    });
    fixture = TestBed.createComponent(CheckoutLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
