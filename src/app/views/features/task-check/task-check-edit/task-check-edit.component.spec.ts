import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCheckEditComponent } from './task-check-edit.component';

describe('TaskCheckEditComponent', () => {
  let component: TaskCheckEditComponent;
  let fixture: ComponentFixture<TaskCheckEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCheckEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCheckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
