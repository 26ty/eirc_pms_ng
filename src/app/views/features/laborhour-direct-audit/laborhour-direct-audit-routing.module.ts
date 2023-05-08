import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LaborhourDirectAuditComponent } from './laborhour-direct-audit.component';

const routes: Routes = [{ path: '', component: LaborhourDirectAuditComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborhourDirectAuditRoutingModule { }
