import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderReEditComponent } from './manufacture-order-re-edit.component';



const routes: Routes = [{ path: '', component:  ManufactureOrderReEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureOrderReEditRoutingModule { }
