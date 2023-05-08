import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { PmAuditComponent } from './pm-audit.component';
import { PmAuditRoutingModule } from './pm-audit-routing.module';
import { PmAuditEditComponent } from './pm-audit-edit/pm-audit-edit.component';

@NgModule({
  declarations: [
    PmAuditComponent,
    PmAuditEditComponent
  ],
  imports: [
    CommonModule,
    PmAuditRoutingModule,
    SharedModule
  ]
})
export class PmAuditModule { }
