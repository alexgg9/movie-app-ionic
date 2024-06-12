import { TestBed } from '@angular/core/testing';

import { TmdbapiService } from './tmdbapi.service';

describe('TmdbapiService', () => {
  let service: TmdbapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
