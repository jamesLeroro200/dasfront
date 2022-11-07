import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewerDialogComponent } from './application-reviewer-dialog.component';

describe('ApplicationReviewerDialogComponent', () => {
  let component: ApplicationReviewerDialogComponent;
  let fixture: ComponentFixture<ApplicationReviewerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReviewerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
