import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from './../../../shared/shared.module';
import {OrderListModule} from 'primeng/orderlist';
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {StyleClassModule} from 'primeng/styleclass';
import { CaseDialogComponent } from './case-dialog/case-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CaseDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    OrderListModule,
    ListboxModule,
    CardModule,
    TabViewModule,
    StyleClassModule
  ]
})
export class DashboardModule { }
