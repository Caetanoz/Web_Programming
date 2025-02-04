import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalListComponent } from './local-list.component';

describe('LocalListComponent', () => {
  let component: LocalListComponent;
  let fixture: ComponentFixture<LocalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalListComponent]
    });
    fixture = TestBed.createComponent(LocalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
