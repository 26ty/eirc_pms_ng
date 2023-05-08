import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderReComponent } from './manufacture-order-re.component';


const routes: Routes = [{ path: '', component:  ManufactureOrderReComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureOrderReRoutingModule { }
