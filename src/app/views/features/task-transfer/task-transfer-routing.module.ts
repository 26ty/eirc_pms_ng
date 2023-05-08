import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTransferComponent } from './task-transfer.component';

const routes: Routes = [{ path: '', component: TaskTransferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskTransferRoutingModule { }