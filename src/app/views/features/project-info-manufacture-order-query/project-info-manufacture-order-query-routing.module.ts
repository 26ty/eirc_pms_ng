import { NgModule } from '@angular/core';
import { ProjectInfoManufactureOrderQueryComponent } from './project-info-manufacture-order-query.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectInfoManufactureOrderQueryComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectInfoManufactureOrderQueryRoutingModule { }


