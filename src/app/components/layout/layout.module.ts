import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [ // 匯出
    HeaderComponent,
    SidenavComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
