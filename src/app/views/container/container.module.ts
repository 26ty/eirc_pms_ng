import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ContainerComponent } from './container.component';
import { SharedModule } from './../../shared/shared.module';
import { LayoutModule } from './../../components/layout/layout.module';

@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    SharedModule,
    LayoutModule,
  ]
})
export class ContainerModule { }
