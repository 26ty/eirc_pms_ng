import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LaborhourDirectAuditEditComponent } from './laborhour-direct-audit-edit.component';

const routes: Routes = [{ path: '', component: LaborhourDirectAuditEditComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborhourDirectAuditEditRoutingModule { }
