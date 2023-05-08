import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRecordBookRoutingModule } from './project-record-book-routing.module';
import { ProjectRecordBookComponent } from './project-record-book.component';
import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [
    ProjectRecordBookComponent
  ],
  imports: [
    CommonModule,
    ProjectRecordBookRoutingModule,
    SharedModule
  ]
})
export class ProjectRecordBookModule { }
