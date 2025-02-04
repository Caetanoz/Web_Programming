import { TestBed } from '@angular/core/testing';

import { LocalRestService } from './local-rest.service';

describe('LocalRestService', () => {
  let service: LocalRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
