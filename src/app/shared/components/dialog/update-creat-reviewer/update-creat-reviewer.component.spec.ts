import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreatReviewerComponent } from './update-creat-reviewer.component';

describe('UpdateCreatReviewerComponent', () => {
  let component: UpdateCreatReviewerComponent;
  let fixture: ComponentFixture<UpdateCreatReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCreatReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCreatReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
