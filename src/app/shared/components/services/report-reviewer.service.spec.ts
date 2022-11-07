import { TestBed } from '@angular/core/testing';

import { ReportReviewerService } from './report-reviewer.service';

describe('ReportReviewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportReviewerService = TestBed.get(ReportReviewerService);
    expect(service).toBeTruthy();
  });
});
