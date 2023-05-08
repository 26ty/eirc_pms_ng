import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { ProjectManagerComponent } from './project-manager.component';
import { SharedModule } from './../../../shared/shared.module';

import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ManufactureOrderOpenComponent } from './manufacture-order-open/manufacture-order-open.component';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { Add2DialogComponent } from './add2-dialog/add2-dialog.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ProjectManagerComponent,
    AddDialogComponent,
    ManufactureOrderOpenComponent,
    DetailDialogComponent,
    Add2DialogComponent,
    //EditDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectManagerRoutingModule,
    ChartsModule
  ]
})
export class ProjectManagerModule { }
