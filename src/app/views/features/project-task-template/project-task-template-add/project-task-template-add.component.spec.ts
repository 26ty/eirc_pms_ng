import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskTemplateAddComponent } from './project-task-template-add.component';

describe('ProjectTaskTemplateAddComponent', () => {
  let component: ProjectTaskTemplateAddComponent;
  let fixture: ComponentFixture<ProjectTaskTemplateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTaskTemplateAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskTemplateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
