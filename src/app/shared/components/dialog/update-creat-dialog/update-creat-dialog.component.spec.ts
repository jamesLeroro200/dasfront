import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreatDialogComponent } from './update-creat-dialog.component';

describe('UpdateCreatDialogComponent', () => {
  let component: UpdateCreatDialogComponent;
  let fixture: ComponentFixture<UpdateCreatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCreatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCreatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
