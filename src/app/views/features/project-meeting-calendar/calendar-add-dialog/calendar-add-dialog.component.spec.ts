import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAddDialogComponent } from './calendar-add-dialog.component';

describe('CalendarAddDialogComponent', () => {
  let component: CalendarAddDialogComponent;
  let fixture: ComponentFixture<CalendarAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
