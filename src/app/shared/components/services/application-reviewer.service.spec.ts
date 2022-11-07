import { TestBed } from '@angular/core/testing';

import { ApplicationReviewerService } from './application-reviewer.service';

describe('ApplicationReviewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationReviewerService = TestBed.get(ApplicationReviewerService);
    expect(service).toBeTruthy();
  });
});
