import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalContactListAddRoutingModule } from './internal-contact-list-add-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InternalContactListAddRoutingModule,
    SharedModule
  ]
})
export class InternalContactListAddModule { }
