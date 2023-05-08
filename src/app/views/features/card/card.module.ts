import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';
import { SharedModule } from './../../../shared/shared.module';
// import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    MatMenuModule,
    CommonModule,
    SharedModule,
    CardRoutingModule,
    // ButtonModule
  ]
})
export class CardModule { }
