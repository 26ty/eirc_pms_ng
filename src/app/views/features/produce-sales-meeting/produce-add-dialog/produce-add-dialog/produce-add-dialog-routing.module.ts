import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduceAddDialogComponent } from './produce-add-dialog.component';

const routes: Routes = [{ path: '', component: ProduceAddDialogComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProduceAddDialogRoutingModule { }
