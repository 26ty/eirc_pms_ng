import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMeetingCalendarComponent } from './project-meeting-calendar.component';

describe('ProjectMeetingCalendarComponent', () => {
  let component: ProjectMeetingCalendarComponent;
  let fixture: ComponentFixture<ProjectMeetingCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMeetingCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMeetingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
