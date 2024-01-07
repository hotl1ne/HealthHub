import { TestBed } from '@angular/core/testing';

import { GoogleAuthcService } from './google-authc.service';

describe('GoogleAuthcService', () => {
  let service: GoogleAuthcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAuthcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
