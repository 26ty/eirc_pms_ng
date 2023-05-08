import { NgModule } from '@angular/core';
import { ProjectInfoManufactureOrderListComponent } from './project-info-manufacture-order-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectInfoManufactureOrderListComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectInfoManufactureOrderListRoutingModule { }
