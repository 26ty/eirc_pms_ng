import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LaborhourReturnEditComponent } from './laborhour-return-edit.component';

const routes: Routes = [{ path: '', component: LaborhourReturnEditComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborhourReturnEditRoutingModule { }
