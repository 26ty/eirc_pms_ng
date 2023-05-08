import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrPmReturnEditComponent } from './cr-pm-return-edit.component';


const routes: Routes = [{ path: '', component: CrPmReturnEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrPmReturnEditRoutingModule { }
