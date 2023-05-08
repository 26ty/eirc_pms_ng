import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskReturnComponent } from './task-return.component';

const routes:Routes = [{path:'',component:TaskReturnComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskReturnRoutingModule { }
