import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAuditEditComponent } from './task-audit-edit.component';

describe('TaskAuditEditComponent', () => {
  let component: TaskAuditEditComponent;
  let fixture: ComponentFixture<TaskAuditEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAuditEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAuditEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
