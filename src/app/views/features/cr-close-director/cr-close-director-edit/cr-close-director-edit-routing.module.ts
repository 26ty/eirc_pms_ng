import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCloseDirectorEditComponent } from './cr-close-director-edit.component';

const routes: Routes = [{ path: '', component: CrCloseDirectorEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCloseDirectorEditRoutingModule { }

