import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalContactListEditRoutingModule } from './internal-contact-list-edit-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InternalContactListEditRoutingModule,
    SharedModule
  ]
})
export class InternalContactListEditModule { }
