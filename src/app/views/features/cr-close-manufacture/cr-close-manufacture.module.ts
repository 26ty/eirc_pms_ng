import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCloseManufactureComponent } from './cr-close-manufacture.component';
import { CrCloseManufactureRoutingModule } from './cr-close-manufacture-routing.module';
import { CrCloseManufactureEditComponent } from './cr-close-manufacture-edit/cr-close-manufacture-edit.component';

@NgModule({
  declarations: [
    CrCloseManufactureComponent,
    CrCloseManufactureEditComponent,
  ],
  imports: [
    CommonModule,
    CrCloseManufactureRoutingModule,
    SharedModule
  ]
})
export class CrCloseManufactureModule { }
