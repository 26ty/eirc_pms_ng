import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplateAddComponent } from './project-template-add.component';

describe('ProjectTemplateAddComponent', () => {
  let component: ProjectTemplateAddComponent;
  let fixture: ComponentFixture<ProjectTemplateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTemplateAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTemplateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
