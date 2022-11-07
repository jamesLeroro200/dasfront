import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatDialogUserComponent } from './creat-dialog-user.component';

describe('CreatDialogUserComponent', () => {
  let component: CreatDialogUserComponent;
  let fixture: ComponentFixture<CreatDialogUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatDialogUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatDialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
