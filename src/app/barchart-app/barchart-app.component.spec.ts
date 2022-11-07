import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartAppComponent } from './barchart-app.component';

describe('BarchartAppComponent', () => {
  let component: BarchartAppComponent;
  let fixture: ComponentFixture<BarchartAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
