import { TestBed } from '@angular/core/testing';

import { NormService } from './norm.service';

describe('NormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormService = TestBed.get(NormService);
    expect(service).toBeTruthy();
  });
});
