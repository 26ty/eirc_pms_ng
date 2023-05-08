import { TestBed } from '@angular/core/testing';

import { SwalEventService } from './swal-event.service';

describe('SwalEventService', () => {
  let service: SwalEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
