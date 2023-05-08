import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectMeetingCalendarComponent } from './project-meeting-calendar.component';
import { SharedModule } from './../../../shared/shared.module';
import { ProjectMeetingCalendarRoutingModule } from './project-meeting-calendar-routing.module';
import { CalendarAddDialogComponent } from './calendar-add-dialog/calendar-add-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component'; // a plugin!


@NgModule({
  declarations: [
    ProjectMeetingCalendarComponent,
    CalendarAddDialogComponent,
    CalendarDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectMeetingCalendarRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FullCalendarModule // register FullCalendar with you app
  ]
})
export class ProjectMeetingCalendarModule { }
