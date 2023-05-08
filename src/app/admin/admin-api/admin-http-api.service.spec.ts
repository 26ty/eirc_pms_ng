import { TestBed } from '@angular/core/testing';

import { AdminHttpApiService } from './admin-http-api.service';

describe('AdminHttpApiService', () => {
  let service: AdminHttpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHttpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
