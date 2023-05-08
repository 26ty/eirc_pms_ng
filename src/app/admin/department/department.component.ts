import { HttpApiService } from './../../api/http-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Departments } from '../models/organization';
import { OrganizationService } from '../../_services/organization.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentNewDialogComponent } from './department-new-dialog/department-new-dialog.component';
import { DepartmentEditDialogComponent } from './department-edit-dialog/department-edit-dialog.component';
//api server
import { AdminHttpApiService } from '../admin-api/admin-http-api.service';
import Swal from 'sweetalert2'
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private organizationService: OrganizationService,
    public dialog: MatDialog,
    public adminHttpApiService:AdminHttpApiService,
    private HttpApiService :HttpApiService
    ) { }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //取得部門資料列表
    this.getDepartmentDataList()
  }

  displayedColumn:string[] = ['name','eng_name','manager_name','introduction','create_time','edit','delete'];
  //宣告projectmanager dataSource
  departmentDataSource = new MatTableDataSource();

  //取得部門資料列表
  departmentData:any
  totalCount:any
  getDepartmentDataList(){
    this.adminHttpApiService.getDepartmentUserList().subscribe(
      res => {
        this.departmentData = res.body.department
        console.log(this.departmentData)
        this.showData(this.departmentDataSource,this.departmentData)
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

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = 'e0731704-13ad-484c-b04c-db4c553a90f7'
    trManagerDatas['actor'] = '刪除'
    trManagerDatas['content'] = '部門資料'
    trManagerDatas['creater'] = this.userJson.account_id

    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  //刪除部門資料
  deleteDepartment(id:any){

    Swal.fire({
      title: '您是否確定要刪除此部門?',
      text: "刪除後無法恢復!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*送審 */
        this.adminHttpApiService.deleteDepartment(this.userJson.account,id).subscribe(
          res => {
            /*新增一筆紀錄 */
          this.uploadTransactionRecordRequests()
          }
        )

        Swal.fire({
          title: `此部門已被刪除！`,
          icon: 'success',
          confirmButtonText: '確認!',
          confirmButtonColor: '#64c270',
          reverseButtons: true
        }).then((result) => {
          if(result.isConfirmed){
            //取得部門資料列表
            this.getDepartmentDataList()
          }
        })
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          '已取消!',
          '此部門未被刪除',
          'error'
        )
      }
    })
  }

  addItem() {
    this.dialog.open(DepartmentNewDialogComponent);
  }

  editItem() {
    this.dialog.open(DepartmentEditDialogComponent);
  }

  doPostEdit(item: any): void {
    this.dialog.open(DepartmentEditDialogComponent, {
      data: {
        d_id: item
      }
    });
    //console.log(item)
  }

  // openCreate(): void {
  //   const dialogRef = this.dialog.open(CreatedepartmentComponent, {
  //     hasBackdrop: false,
  //     height: '500px',
  //     width: '800px',

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('關閉');

  //   });
  // }

  // openEdit(row: any): void {
  //   const dialogRef = this.dialog.open(EditdepartmentComponent, {
  //     hasBackdrop: false,
  //     height: '600px',
  //     width: '600px',
  //     data: row
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('close');
  //   })
  // }
  // openDel(row: any): void {
  //   const dialogRef = this.dialog.open(DeldepartmentComponent, {
  //     hasBackdrop: false,
  //     height: '400px',
  //     width: '400px',
  //     data: row
  //   });
  // }

}
