import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRecordDialogComponent } from './work-record-dialog.component';

describe('WorkRecordDialogComponent', () => {
  let component: WorkRecordDialogComponent;
  let fixture: ComponentFixture<WorkRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
