import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmResetForgotPasswordComponent } from './confirm-reset-forgot-password.component';

describe('ConfirmResetForgotPasswordComponent', () => {
  let component: ConfirmResetForgotPasswordComponent;
  let fixture: ComponentFixture<ConfirmResetForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmResetForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmResetForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
