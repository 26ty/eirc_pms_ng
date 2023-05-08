import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LaborhourReturnComponent } from './laborhour-return.component';


const routes: Routes = [{ path: '', component: LaborhourReturnComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborhourReturnRoutingModule { }
