import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureOrderReComponent } from './manufacture-order-re.component';
import { ManufactureOrderReRoutingModule } from './manufacture-order-re-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManufactureOrderReEditComponent } from './manufacture-order-re-edit/manufacture-order-re-edit.component';
@NgModule({
  declarations: [
    ManufactureOrderReComponent,
    ManufactureOrderReEditComponent
  ],
  imports: [
    CommonModule,
    ManufactureOrderReRoutingModule,
    SharedModule
  ]
})

export class ManufactureOrderReModule { }
