import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReturnEditComponent } from './task-return-edit.component';

describe('TaskReturnEditComponent', () => {
  let component: TaskReturnEditComponent;
  let fixture: ComponentFixture<TaskReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
