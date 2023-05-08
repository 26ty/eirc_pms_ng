import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import { CreatepositionComponent } from './position/createposition/createposition.component';
import { EditpositionComponent } from './position/editposition/editposition.component';
import { DelpositionComponent } from './position/delposition/delposition.component';
import { UserEditDialogComponent } from './user/user-edit-dialog/user-edit-dialog.component';
import { UserNewDialogComponent } from './user/user-new-dialog/user-new-dialog.component';
import { DepartmentNewDialogComponent } from './department/department-new-dialog/department-new-dialog.component';
import { DepartmentEditDialogComponent } from './department/department-edit-dialog/department-edit-dialog.component';
import { PositionNewDialogComponent } from './position/position-new-dialog/position-new-dialog.component';
import { PositionEditDialogComponent } from './position/position-edit-dialog/position-edit-dialog.component';


const MaModule = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatPaginatorModule,
  MatDialogModule,
  MatGridListModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatRadioModule
];


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations:
    [AdminComponent,
    UserComponent,
    DepartmentComponent,
    PositionComponent,
    CreatepositionComponent,
    EditpositionComponent, 
    DelpositionComponent,
    UserEditDialogComponent, 
    UserNewDialogComponent, 
    DepartmentNewDialogComponent, 
    DepartmentEditDialogComponent,
    PositionNewDialogComponent,
    PositionEditDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    /*BrowserModule,
    BrowserAnimationsModule,
    FormsModule,*/
    ReactiveFormsModule,
    HttpClientModule,
    MaModule
  ]
})
export class AdminModule { }