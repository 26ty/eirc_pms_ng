import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestEditComponent } from './project-request-edit.component';

describe('ProjectRequestEditComponent', () => {
  let component: ProjectRequestEditComponent;
  let fixture: ComponentFixture<ProjectRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
