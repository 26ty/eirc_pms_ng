import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrSignManagerEditComponent } from './cr-sign-manager-edit.component';

const routes: Routes = [{ path: '', component: CrSignManagerEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrSignManagerEditRoutingModule { }
