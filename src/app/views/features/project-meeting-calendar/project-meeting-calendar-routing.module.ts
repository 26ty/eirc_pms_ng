import { ProjectMeetingCalendarComponent } from './project-meeting-calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes : Routes = [{ path: '', component: ProjectMeetingCalendarComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMeetingCalendarRoutingModule { }
