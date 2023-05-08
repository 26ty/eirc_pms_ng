import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRecordDialogComponent } from './return-record-dialog.component';

describe('ReturnRecordDialogComponent', () => {
  let component: ReturnRecordDialogComponent;
  let fixture: ComponentFixture<ReturnRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
