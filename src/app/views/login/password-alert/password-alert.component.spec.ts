import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAlertComponent } from './password-alert.component';

describe('PasswordAlertComponent', () => {
  let component: PasswordAlertComponent;
  let fixture: ComponentFixture<PasswordAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
