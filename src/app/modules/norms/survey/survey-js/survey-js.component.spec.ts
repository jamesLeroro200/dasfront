import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyJsComponent } from './survey-js.component';

describe('SurveyJsComponent', () => {
  let component: SurveyJsComponent;
  let fixture: ComponentFixture<SurveyJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
