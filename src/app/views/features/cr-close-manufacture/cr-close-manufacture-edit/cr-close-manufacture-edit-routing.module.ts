import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCloseManufactureEditComponent } from './cr-close-manufacture-edit.component';

const routes: Routes = [{ path: '', component: CrCloseManufactureEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCloseManufactureEditRoutingModule { }
