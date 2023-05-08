import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PmReturnEditComponent } from './pm-return-edit.component';

const routes:Routes = [{path:'',component:PmReturnEditComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmReturnEditRoutingModule { }
