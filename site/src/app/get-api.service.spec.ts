import { TestBed, inject } from '@angular/core/testing';

import { GetApiService } from './get-api.service';

describe('GetApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetApiService]
    });
  });

  it('should be created', inject([GetApiService], (service: GetApiService) => {
    expect(service).toBeTruthy();
  }));
});
