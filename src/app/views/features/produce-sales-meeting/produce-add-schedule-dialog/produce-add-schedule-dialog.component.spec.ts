import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceAddScheduleDialogComponent } from './produce-add-schedule-dialog.component';

describe('ProduceAddScheduleDialogComponent', () => {
  let component: ProduceAddScheduleDialogComponent;
  let fixture: ComponentFixture<ProduceAddScheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceAddScheduleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceAddScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
