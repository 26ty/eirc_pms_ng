import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { LaborhourDirectAuditEditComponent } from './laborhour-direct-audit-edit.component';
import { LaborhourDirectAuditEditRoutingModule } from './laborhour-direct-audit-edit-routing.module';

@NgModule({
  declarations: [
    LaborhourDirectAuditEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaborhourDirectAuditEditRoutingModule
  ]
})
export class LaborhourDirectAuditEditModule { }
