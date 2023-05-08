import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftApplicationListComponent } from './gift-application-list.component';

const routes: Routes = [{ path: '', component:GiftApplicationListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftApplicationListRoutingModule { }
