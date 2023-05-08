import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { ProjectInfomanufactureOrderauditRoutingModule } from './project-infomanufacture-orderaudit-routing.module';
import { ProjectInfomanufactureOrderauditComponent } from './project-infomanufacture-orderaudit.component';
import { ProjectInfomanufactureOrderauditEditComponent } from './project-infomanufacture-orderaudit-edit/project-infomanufacture-orderaudit-edit.component';

@NgModule({
  declarations: [
    ProjectInfomanufactureOrderauditComponent,
    ProjectInfomanufactureOrderauditEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectInfomanufactureOrderauditRoutingModule
  ]
})
export class ProjectInfomanufactureOrderauditModule { }
