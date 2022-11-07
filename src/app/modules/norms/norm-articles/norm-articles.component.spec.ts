import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormArticlesComponent } from './norm-articles.component';

describe('NormArticlesComponent', () => {
  let component: NormArticlesComponent;
  let fixture: ComponentFixture<NormArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
