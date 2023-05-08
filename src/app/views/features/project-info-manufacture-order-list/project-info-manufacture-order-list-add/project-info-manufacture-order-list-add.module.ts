import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectInfoManufactureOrderListAddComponent } from './project-info-manufacture-order-list-add.component';
import { ProjectInfoManufactureOrderListAddRoutingModule } from './project-info-manufacture-order-list-add-routing.module';
import { SharedModule } from './../../../../shared/shared.module';


@NgModule({
  declarations: [
    ProjectInfoManufactureOrderListAddComponent,
  ],
  imports: [
    CommonModule,
    ProjectInfoManufactureOrderListAddRoutingModule,
    SharedModule
  ]
})
export class ProjectInfoManufactureOrderListAddModule { }




