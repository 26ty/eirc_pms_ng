import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAuditEditComponent } from './task-audit-edit.component';

const routes: Routes = [{ path: '', component: TaskAuditEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskAuditEditRoutingModule { }