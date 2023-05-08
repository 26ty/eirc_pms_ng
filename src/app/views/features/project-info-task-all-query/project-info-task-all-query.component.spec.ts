import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoTaskAllQueryComponent } from './project-info-task-all-query.component';

describe('ProjectInfoTaskAllQueryComponent', () => {
  let component: ProjectInfoTaskAllQueryComponent;
  let fixture: ComponentFixture<ProjectInfoTaskAllQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoTaskAllQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoTaskAllQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
