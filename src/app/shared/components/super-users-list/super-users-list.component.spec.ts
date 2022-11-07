import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUsersListComponent } from './super-users-list.component';

describe('SuperUsersListComponent', () => {
  let component: SuperUsersListComponent;
  let fixture: ComponentFixture<SuperUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
