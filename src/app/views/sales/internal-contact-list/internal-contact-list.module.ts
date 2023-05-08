import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalContactListComponent } from './internal-contact-list.component';
import { InternalContactListRoutingModule } from './internal-contact-list-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { InternalContactListAddComponent } from './internal-contact-list-add/internal-contact-list-add.component';
import { InternalContactListEditComponent } from './internal-contact-list-edit/internal-contact-list-edit.component';
@NgModule({
  declarations: [
    InternalContactListComponent,
    InternalContactListAddComponent,
    InternalContactListEditComponent
  ],
  imports: [
    CommonModule,
    InternalContactListRoutingModule,
    SharedModule
  ]
})
export class InternalContactListModule { }
