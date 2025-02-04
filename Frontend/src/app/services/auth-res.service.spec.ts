import { TestBed } from '@angular/core/testing';

import { AuthResService } from './auth-res.service';

describe('AuthResService', () => {
  let service: AuthResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
