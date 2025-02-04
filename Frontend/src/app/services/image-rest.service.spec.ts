import { TestBed } from '@angular/core/testing';

import { ImageRestService } from './image-rest.service';

describe('ImageRestService', () => {
  let service: ImageRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
