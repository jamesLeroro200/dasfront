import { TestBed } from '@angular/core/testing';

import { TokenValidatorService } from './token-validator.service';

describe('TokenValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenValidatorService = TestBed.get(TokenValidatorService);
    expect(service).toBeTruthy();
  });
});
