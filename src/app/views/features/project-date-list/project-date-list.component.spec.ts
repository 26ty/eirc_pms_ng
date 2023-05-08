import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDateListComponent } from './project-date-list.component';

describe('ProjectDateListComponent', () => {
  let component: ProjectDateListComponent;
  let fixture: ComponentFixture<ProjectDateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
