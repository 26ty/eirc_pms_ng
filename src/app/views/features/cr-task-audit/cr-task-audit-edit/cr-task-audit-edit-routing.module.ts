import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrTaskAuditEditComponent } from './cr-task-audit-edit.component';

const routes: Routes = [{ path: '', component: CrTaskAuditEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrTaskAuditEditRoutingModule { }

