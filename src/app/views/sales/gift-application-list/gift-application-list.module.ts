import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftApplicationListComponent } from './gift-application-list.component';
import { GiftApplicationListRoutingModule } from './gift-application-list-routing.module';
import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [
    GiftApplicationListComponent
  ],
  imports: [
    CommonModule,
    GiftApplicationListRoutingModule,
    SharedModule
  ]
})
export class GiftApplicationListModule { }
