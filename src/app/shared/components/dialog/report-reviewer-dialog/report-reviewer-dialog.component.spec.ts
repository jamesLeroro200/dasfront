import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReviewerDialogComponent } from './report-reviewer-dialog.component';

describe('ReportReviewerDialogComponent', () => {
  let component: ReportReviewerDialogComponent;
  let fixture: ComponentFixture<ReportReviewerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReviewerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReviewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
