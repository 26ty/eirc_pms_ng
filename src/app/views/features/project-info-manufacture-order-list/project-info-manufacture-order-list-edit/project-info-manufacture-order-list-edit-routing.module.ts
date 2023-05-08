import { NgModule } from '@angular/core';
import { ProjectInfoManufactureOrderListEditComponent } from './project-info-manufacture-order-list-edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectInfoManufactureOrderListEditComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectInfoManufactureOrderListEditRoutingModule { }


