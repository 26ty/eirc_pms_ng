import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { ToDoListComponent } from './to-do-list.component';
import { TypeDialogComponent } from './type-dialog/type-dialog.component';

@NgModule({
  declarations: [
    ToDoListComponent,
    TypeDialogComponent
  ],
  imports: [
    CommonModule,
    ToDoListRoutingModule,
    SharedModule
  ]
})
export class ToDoListModule { }
