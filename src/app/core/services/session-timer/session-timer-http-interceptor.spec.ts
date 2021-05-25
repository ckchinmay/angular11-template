import { TestBed, inject } from '@angular/core/testing';

import { SessionTimerHttpInterceptorService } from './session-timer-http-interceptor.service';

describe('SessionTimerHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionTimerHttpInterceptorService]
    });
  });

  it('should be created', inject([SessionTimerHttpInterceptorService], (service: SessionTimerHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});