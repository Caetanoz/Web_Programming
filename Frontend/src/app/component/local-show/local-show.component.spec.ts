import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalShowComponent } from './local-show.component';

describe('LocalShowComponent', () => {
  let component: LocalShowComponent;
  let fixture: ComponentFixture<LocalShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalShowComponent]
    });
    fixture = TestBed.createComponent(LocalShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
