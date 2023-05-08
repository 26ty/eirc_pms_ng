import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureOrderQcComponent } from './manufacture-order-qc.component';
import { ManufactureOrderQcRoutingModule } from './manufacture-order-qc-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManufactureOrderQcEditComponent } from './manufacture-order-qc-edit/manufacture-order-qc-edit.component';
@NgModule({
  declarations: [
    ManufactureOrderQcComponent,
    ManufactureOrderQcEditComponent
  ],
  imports: [
    CommonModule,
    ManufactureOrderQcRoutingModule,
    SharedModule
  ]
})
export class ManufactureOrderQcModule { }
