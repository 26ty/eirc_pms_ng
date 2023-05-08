import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAuditFormComponent } from './project-audit-form.component';

describe('ProjectAuditFormComponent', () => {
  let component: ProjectAuditFormComponent;
  let fixture: ComponentFixture<ProjectAuditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAuditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAuditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
