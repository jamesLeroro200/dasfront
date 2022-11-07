import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNormComponent } from './update-norm.component';

describe('UpdateNormComponent', () => {
  let component: UpdateNormComponent;
  let fixture: ComponentFixture<UpdateNormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
