import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderMgEditComponent } from './manufacture-order-mg-edit.component';



const routes: Routes = [{ path: '', component:  ManufactureOrderMgEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureOrderMgEditRoutingModule { }
