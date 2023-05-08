import { UserNewDialogComponent } from './user-new-dialog/user-new-dialog.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MatDialog, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../_services/user.service';
import { Users, UserItem } from '../models/user';
import { Departments, Position } from '../models/organization';
import { OrganizationService } from '../../_services/organization.service';
import { AdminHttpApiService } from '../admin-api/admin-http-api.service';
import { HttpApiService } from 'src/app/api/http-api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public adminHttpApiService:AdminHttpApiService,
    private HttpApiService :HttpApiService
  ) { }

  ngOnInit(): void {
    this.getUserDataList()
  }

  displayedColumn:string[] = ['account','name','email','phone','edit','delete'];
  datasSource = new MatTableDataSource();

  //取得部門資料列表
  usersData:any
  totalCount:any
  getUserDataList(){
    this.adminHttpApiService.getUser().subscribe(
      res => {
        this.usersData = res.body.accounts
        console.log(this.usersData)
        this.showData(this.datasSource,this.usersData)
      }
    )
  }

  // 顯示資料
  showData(dataSource:any,data: any) {
    dataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
  }

  addItem() {
    this.dialog.open(UserNewDialogComponent);
  }

  editItem() {
    this.dialog.open(UserEditDialogComponent);
  }

  //編輯任務彈跳視窗
  doPostEdit(item: any,item2:any): void {
    this.dialog.open(UserEditDialogComponent, {
      data: {
        user_id: item,
        bonita_user_id : item2
      }
    });
    //console.log(item)
  }
  
  deleteRes:any
  doPostDelete(accountId:any,account:any):void{
    this.adminHttpApiService.deleteUser(accountId,account).subscribe(
      res => {
        this.deleteRes = res
        console.log(this.deleteRes)
        if(this.deleteRes.code == 200){
          window.alert("已刪除")
          location.reload()
        }
      }
    )
  }


  // openCreate(): void {
  //   const dialogRef = this.dialog.open(UsercreateComponent, {
  //     hasBackdrop: false,
  //     height: '80%',
  //     width: '60%',

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('關閉');

  //   });
  // }

  // openEdit(row: any): void {
  //   const dialogRef = this.dialog.open(UsereditComponent, {
  //     hasBackdrop: false,
  //     height: '80%',
  //     width: '60%',
  //     data: row
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('close');
  //   })
  // }
  // openDel(row: any): void {
  //   const dialogRef = this.dialog.open(UserDel, {
  //     hasBackdrop: false,
  //     height: '400px',
  //     width: '400px',
  //     data: row
  //   });
  // }

}


// @Component({
//   selector: 'user-del',
//   templateUrl: './user-del.component.html'
// })

// export class UserDel {
//   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
//   verticalPosition: MatSnackBarVerticalPosition = 'top';

//   constructor(public dialogRef: MatDialogRef<UserDel>, @Inject(MAT_DIALOG_DATA) private data: UserItem, private userService: UserService, private _sankBar: MatSnackBar) { }



//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   UserDel(): void {

//     this.userService.deleteUser(this.data.ID).subscribe(
//       data => {
//         this._sankBar.open(`${this.data.name}刪除成功`, '結束', {
//           duration: 500,
//           horizontalPosition: this.horizontalPosition,
//           verticalPosition: this.verticalPosition,
//         });
//         this.dialogRef.close();
//         window.location.reload();
//       }
//     )
//   }

// }
