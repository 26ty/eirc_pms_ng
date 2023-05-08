import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborHourExtraDialogComponent } from './labor-hour-extra-dialog.component';

describe('LaborHourExtraDialogComponent', () => {
  let component: LaborHourExtraDialogComponent;
  let fixture: ComponentFixture<LaborHourExtraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborHourExtraDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborHourExtraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
