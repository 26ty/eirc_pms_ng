import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VirusCodeListComponent } from './virus-code-list.component';

const routes: Routes = [{ path: '', component: VirusCodeListComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirusCodeListRoutingModule { }
