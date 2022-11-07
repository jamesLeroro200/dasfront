import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewerComponent } from './application-reviewer.component';

describe('ApplicationReviewerComponent', () => {
  let component: ApplicationReviewerComponent;
  let fixture: ComponentFixture<ApplicationReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
