import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttDialogComponent } from './gantt-dialog.component';

describe('GanttDialogComponent', () => {
  let component: GanttDialogComponent;
  let fixture: ComponentFixture<GanttDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
