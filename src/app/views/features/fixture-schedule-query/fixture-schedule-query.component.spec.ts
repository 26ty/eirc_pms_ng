import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureScheduleQueryComponent } from './fixture-schedule-query.component';

describe('FixtureScheduleQueryComponent', () => {
  let component: FixtureScheduleQueryComponent;
  let fixture: ComponentFixture<FixtureScheduleQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixtureScheduleQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureScheduleQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
