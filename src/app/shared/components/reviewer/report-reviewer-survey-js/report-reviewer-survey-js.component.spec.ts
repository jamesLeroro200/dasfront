import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReviewerSurveyJsComponent } from './report-reviewer-survey-js.component';

describe('ReportReviewerSurveyJsComponent', () => {
  let component: ReportReviewerSurveyJsComponent;
  let fixture: ComponentFixture<ReportReviewerSurveyJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReviewerSurveyJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReviewerSurveyJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
