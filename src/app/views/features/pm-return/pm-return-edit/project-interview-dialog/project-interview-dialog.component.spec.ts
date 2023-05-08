import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInterviewDialogComponent } from './project-interview-dialog.component';

describe('ProjectInterviewDialogComponent', () => {
  let component: ProjectInterviewDialogComponent;
  let fixture: ComponentFixture<ProjectInterviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInterviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInterviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
