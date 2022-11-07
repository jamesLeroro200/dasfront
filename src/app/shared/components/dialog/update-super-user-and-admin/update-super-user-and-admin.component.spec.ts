import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuperUserAndAdminComponent } from './update-super-user-and-admin.component';

describe('UpdateSuperUserAndAdminComponent', () => {
  let component: UpdateSuperUserAndAdminComponent;
  let fixture: ComponentFixture<UpdateSuperUserAndAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSuperUserAndAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuperUserAndAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
