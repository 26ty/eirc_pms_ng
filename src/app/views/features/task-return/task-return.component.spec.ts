import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReturnComponent } from './task-return.component';

describe('TaskReturnComponent', () => {
  let component: TaskReturnComponent;
  let fixture: ComponentFixture<TaskReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
