import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectInfoManufactureOrderListEditComponent } from './project-info-manufacture-order-list-edit.component';
import { ProjectInfoManufactureOrderListEditRoutingModule } from './project-info-manufacture-order-list-edit-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';


@NgModule({
  declarations: [
    ProjectInfoManufactureOrderListEditComponent,
    AuthDialogComponent
  ],
  imports: [
    CommonModule,
    ProjectInfoManufactureOrderListEditRoutingModule,
    SharedModule
  ]
})
export class ProjectInfoManufactureOrderListEditModule { }




