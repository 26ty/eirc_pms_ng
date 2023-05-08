import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCountersignDirectorEditComponent } from './cr-countersign-director-edit.component';

const routes: Routes = [{ path: '', component: CrCountersignDirectorEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCountersignDirectorEditRoutingModule { }
