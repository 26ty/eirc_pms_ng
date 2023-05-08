import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRecordBookComponent } from './project-record-book.component';

const routes : Routes = [{ path: '', component: ProjectRecordBookComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRecordBookRoutingModule { }
