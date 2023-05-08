import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTransferComponent } from './task-transfer.component';

describe('TaskTransferComponent', () => {
  let component: TaskTransferComponent;
  let fixture: ComponentFixture<TaskTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
