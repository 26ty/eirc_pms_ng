import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrLaborHourDialogComponent } from './cr-labor-hour-dialog.component';

describe('CrLaborHourDialogComponent', () => {
  let component: CrLaborHourDialogComponent;
  let fixture: ComponentFixture<CrLaborHourDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrLaborHourDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrLaborHourDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
