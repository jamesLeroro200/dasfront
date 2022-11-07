import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormChapterComponent } from './norm-chapter.component';

describe('NormChapterComponent', () => {
  let component: NormChapterComponent;
  let fixture: ComponentFixture<NormChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
