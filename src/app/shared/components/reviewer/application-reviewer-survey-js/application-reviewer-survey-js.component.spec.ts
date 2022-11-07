import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewerSurveyJsComponent } from './application-reviewer-survey-js.component';

describe('ApplicationReviewerSurveyJsComponent', () => {
  let component: ApplicationReviewerSurveyJsComponent;
  let fixture: ComponentFixture<ApplicationReviewerSurveyJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReviewerSurveyJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewerSurveyJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
