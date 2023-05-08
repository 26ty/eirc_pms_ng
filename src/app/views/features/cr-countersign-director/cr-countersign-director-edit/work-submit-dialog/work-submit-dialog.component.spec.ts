import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSubmitDialogComponent } from './work-submit-dialog.component';

describe('WorkSubmitDialogComponent', () => {
  let component: WorkSubmitDialogComponent;
  let fixture: ComponentFixture<WorkSubmitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSubmitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
