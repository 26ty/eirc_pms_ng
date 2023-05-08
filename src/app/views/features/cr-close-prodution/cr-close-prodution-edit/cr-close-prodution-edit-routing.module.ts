import { CrCloseProdutionEditComponent } from './cr-close-prodution-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CrCloseProdutionEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCloseProdutionEditRoutingModule { }
