import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskTemplateComponent } from './project-task-template.component';

describe('ProjectTaskTemplateComponent', () => {
  let component: ProjectTaskTemplateComponent;
  let fixture: ComponentFixture<ProjectTaskTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
