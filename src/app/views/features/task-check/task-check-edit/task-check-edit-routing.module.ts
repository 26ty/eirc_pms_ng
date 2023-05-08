import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskCheckEditComponent } from './task-check-edit.component';

const routes: Routes = [{ path: '', component: TaskCheckEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskCheckEditRoutingModule { }
