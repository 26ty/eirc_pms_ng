import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskTemplateEditComponent } from './project-task-template-edit.component';

describe('ProjectTaskTemplateEditComponent', () => {
  let component: ProjectTaskTemplateEditComponent;
  let fixture: ComponentFixture<ProjectTaskTemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskTemplateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
