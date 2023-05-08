import { ProjectInfomanufactureOrderauditEditComponent } from './project-infomanufacture-orderaudit-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes : Routes = [{ path: '',component:ProjectInfomanufactureOrderauditEditComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectInfomanufactureOrderauditEditRoutingModule { }
