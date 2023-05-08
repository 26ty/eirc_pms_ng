import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrPmEvalutionEditComponent } from './cr-pm-evalution-edit.component';

const routes: Routes = [{ path: '', component: CrPmEvalutionEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrPmEvalutionEditRoutingModule { }

