import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import { AuthGuard } from './../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminComponent,/****/
    children: [
      /*{path: '', redirectTo: 'user', pathMatch: 'full'},*/
      { path: 'user', component: UserComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'position', component: PositionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
