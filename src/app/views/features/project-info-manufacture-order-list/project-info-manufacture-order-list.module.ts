import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectInfoManufactureOrderListComponent } from './project-info-manufacture-order-list.component';
import { ProjectInfoManufactureOrderListRoutingModule } from './project-info-manufacture-order-list-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
@NgModule({
  declarations: [
    ProjectInfoManufactureOrderListComponent,
    AddDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectInfoManufactureOrderListRoutingModule,
    SharedModule,
  ]
})
export class ProjectInfoManufactureOrderListModule { }


