import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';

import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';



@NgModule({
  declarations: [
    TableComponent,
    AddDialogComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableRoutingModule
  ]
})
export class TableModule { }
