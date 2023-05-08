import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDetailDialogComponent } from './work-detail-dialog.component';

describe('WorkDetailDialogComponent', () => {
  let component: WorkDetailDialogComponent;
  let fixture: ComponentFixture<WorkDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
