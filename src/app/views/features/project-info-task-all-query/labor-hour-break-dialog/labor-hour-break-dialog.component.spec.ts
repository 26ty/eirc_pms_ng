import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborHourBreakDialogComponent } from './labor-hour-break-dialog.component';

describe('LaborHourBreakDialogComponent', () => {
  let component: LaborHourBreakDialogComponent;
  let fixture: ComponentFixture<LaborHourBreakDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborHourBreakDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborHourBreakDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
