import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSuperUserComponent } from './confirmation-super-user.component';

describe('ConfirmationSuperUserComponent', () => {
  let component: ConfirmationSuperUserComponent;
  let fixture: ComponentFixture<ConfirmationSuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationSuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
