import { TestBed } from '@angular/core/testing';

import { JwtIntercerptorInterceptor } from './jwt-intercerptor.interceptor';

describe('JwtIntercerptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtIntercerptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtIntercerptorInterceptor = TestBed.inject(JwtIntercerptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
