import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCountersignDirectorConfirmEditComponent } from './cr-countersign-director-confirm-edit.component';

const routes: Routes = [{ path: '', component: CrCountersignDirectorConfirmEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCountersignDirectorConfirmEditRoutingModule { }
