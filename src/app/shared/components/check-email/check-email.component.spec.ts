import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEmailComponent } from './check-email.component';

describe('CheckEmailComponent', () => {
  let component: CheckEmailComponent;
  let fixture: ComponentFixture<CheckEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
