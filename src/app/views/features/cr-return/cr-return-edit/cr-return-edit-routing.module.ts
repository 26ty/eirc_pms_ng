import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrReturnEditComponent } from './cr-return-edit.component';

const routes: Routes = [{ path: '', component: CrReturnEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrReturnEditRoutingModule { }
