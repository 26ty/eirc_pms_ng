import { TestBed } from '@angular/core/testing';

import { MatsnackbarEventService } from './matsnackbar-event.service';

describe('MatsnackbarEventService', () => {
  let service: MatsnackbarEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatsnackbarEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
