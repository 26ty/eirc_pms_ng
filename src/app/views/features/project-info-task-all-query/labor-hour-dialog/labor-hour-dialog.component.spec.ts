import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborHourDialogComponent } from './labor-hour-dialog.component';

describe('LaborHourDialogComponent', () => {
  let component: LaborHourDialogComponent;
  let fixture: ComponentFixture<LaborHourDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborHourDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborHourDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
