import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PmAuditEditComponent } from './pm-audit-edit.component';

const routes: Routes = [{ path: '', component: PmAuditEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmAuditEditRoutingModule { }
