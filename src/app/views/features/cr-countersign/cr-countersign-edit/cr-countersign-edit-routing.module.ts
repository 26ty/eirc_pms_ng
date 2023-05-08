import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCountersignEditComponent } from './cr-countersign-edit.component';

const routes: Routes = [{ path: '', component: CrCountersignEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCountersignEditRoutingModule { }
