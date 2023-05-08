import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCloseProdutionRoutingModule } from './cr-close-prodution-routing.module';
import { CrCloseProdutionComponent } from './cr-close-prodution.component';
import { CrCloseProdutionEditComponent } from './cr-close-prodution-edit/cr-close-prodution-edit.component';


@NgModule({
  declarations: [
    CrCloseProdutionComponent,
    CrCloseProdutionEditComponent,
  ],
  imports: [
    CommonModule,
    CrCloseProdutionRoutingModule,
    SharedModule
  ]
})
export class CrCloseProdutionModule { }
