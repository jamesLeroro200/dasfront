import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasKTableComponent } from './tas-ktable.component';

describe('TasKTableComponent', () => {
  let component: TasKTableComponent;
  let fixture: ComponentFixture<TasKTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasKTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasKTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
