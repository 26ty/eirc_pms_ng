import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PmTaskReturnEditComponent } from './pm-task-return-edit.component';

const routes:Routes = [{path:'',component:PmTaskReturnEditComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmTaskReturnEditRoutingModule { }
