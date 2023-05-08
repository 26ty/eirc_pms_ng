import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDailyWorkModifyComponent } from './person-daily-work-modify.component';

describe('PersonDailyWorkModifyComponent', () => {
  let component: PersonDailyWorkModifyComponent;
  let fixture: ComponentFixture<PersonDailyWorkModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDailyWorkModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDailyWorkModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
