import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskReturnEditComponent } from './task-return-edit.component';

const routes:Routes = [{path:'',component:TaskReturnEditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskReturnEditRoutingModule { }
