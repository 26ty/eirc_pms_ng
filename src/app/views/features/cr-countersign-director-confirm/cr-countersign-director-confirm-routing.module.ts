
import { CrCountersignDirectorConfirmComponent } from './cr-countersign-director-confirm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CrCountersignDirectorConfirmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCountersignDirectorConfirmRoutingModule { }


