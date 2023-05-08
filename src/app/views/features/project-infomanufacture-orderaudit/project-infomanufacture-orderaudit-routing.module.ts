import { ProjectInfomanufactureOrderauditComponent } from './project-infomanufacture-orderaudit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes : Routes = [{ path: '', component: ProjectInfomanufactureOrderauditComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectInfomanufactureOrderauditRoutingModule { }
