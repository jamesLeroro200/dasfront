import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersListComponent } from './reviewers-list.component';

describe('ReviewersListComponent', () => {
  let component: ReviewersListComponent;
  let fixture: ComponentFixture<ReviewersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
