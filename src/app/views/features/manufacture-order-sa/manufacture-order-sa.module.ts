import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureOrderSaComponent } from './manufacture-order-sa.component';
import { ManufactureOrderSaRoutingModule } from './manufacture-order-sa-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManufactureOrderSaEditComponent } from './manufacture-order-sa-edit/manufacture-order-sa-edit.component';

@NgModule({
  declarations: [
    ManufactureOrderSaComponent,
    ManufactureOrderSaEditComponent
  ],
  imports: [
    CommonModule,
    ManufactureOrderSaRoutingModule,
    SharedModule
  ]
})

export class ManufactureOrderSaModule { }
