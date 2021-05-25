import { TestBed, inject } from '@angular/core/testing';

import { SessionInteruptService } from './session-interupt.service';

describe('SessionInteruptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionInteruptService]
    });
  });

  it('should be created', inject([SessionInteruptService], (service: SessionInteruptService) => {
    expect(service).toBeTruthy();
  }));
});