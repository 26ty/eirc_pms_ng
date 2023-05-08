import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { LaborhourDirectAuditRoutingModule } from './laborhour-direct-audit-routing.module';
import { LaborhourDirectAuditComponent } from './laborhour-direct-audit.component';
import { LaborhourDirectAuditEditComponent } from './laborhour-direct-audit-edit/laborhour-direct-audit-edit.component';

@NgModule({
  declarations: [
    LaborhourDirectAuditComponent,
    //LaborhourDirectAuditEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaborhourDirectAuditRoutingModule
  ]
})
export class LaborhourDirectAuditModule { }
