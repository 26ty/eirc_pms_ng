import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectInfoManufactureOrderQueryComponent } from './project-info-manufacture-order-query.component';
import { ProjectInfoManufactureOrderQueryRoutingModule } from './project-info-manufacture-order-query-routing.module';
import { SharedModule } from './../../../shared/shared.module';


@NgModule({
  declarations: [
    ProjectInfoManufactureOrderQueryComponent,
  ],
  imports: [
    CommonModule,
    ProjectInfoManufactureOrderQueryRoutingModule,
    SharedModule
  ]
})
export class ProjectInfoManufactureOrderQueryModule { }




