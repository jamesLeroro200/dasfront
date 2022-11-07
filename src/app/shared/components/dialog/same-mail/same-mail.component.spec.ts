import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SameMailComponent } from './same-mail.component';

describe('SameMailComponent', () => {
  let component: SameMailComponent;
  let fixture: ComponentFixture<SameMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SameMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SameMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
