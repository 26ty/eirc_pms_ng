import { NgModule } from '@angular/core';
import { ProjectInfoManufactureOrderListAddComponent } from './project-info-manufacture-order-list-add.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectInfoManufactureOrderListAddComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectInfoManufactureOrderListAddRoutingModule { }


