import { HttpApiService } from './../../api/http-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
//import { Jobtitles } from '../models/organization';
import { OrganizationService } from '../../_services/organization.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreatepositionComponent } from './createposition/createposition.component';
import { EditpositionComponent } from './editposition/editposition.component';
import { DelpositionComponent } from './delposition/delposition.component';
import { PositionNewDialogComponent } from './position-new-dialog/position-new-dialog.component';
import { PositionEditDialogComponent } from './position-edit-dialog/position-edit-dialog.component';

//api server
import { AdminHttpApiService } from '../admin-api/admin-http-api.service';
import Swal from 'sweetalert2'
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumn: string[] = ['name', 'bonita_role_id', 'edit', 'delete'];
  //displayedColumn: string[] = ['name', 'bonita_role_id'];
  constructor(
    private organizationService: OrganizationService,
    public dialog: MatDialog,
    public adminHttpApiService: AdminHttpApiService,
    private HttpApiService: HttpApiService
  ) { }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    //取得部門資料列表
    this.getJobtitleDataList()
  }

  //宣告projectmanager dataSource
  jobtitleDataSource = new MatTableDataSource();

  //取得職稱資料列表
  jobtitleData: any
  totalCount: any
  getJobtitleDataList() {
    this.adminHttpApiService.getJobTitle(1).subscribe(
      res => {
        console.log(res)
        this.jobtitleData = res.body.jobtitle
        
        for(var lenght in this.jobtitleData){
          if(this.jobtitleData[lenght].bonita_role_id == "1"){
            this.jobtitleData[lenght].bonita_role_id = true
          }
        }
        console.log(this.jobtitleData)
        this.showData(this.jobtitleDataSource, this.jobtitleData)
      }
    )
  }

  // 顯示資料
  showData(dataSource: any, data: any) {
    dataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    dataSource.sort = this.sort;
    dataSource.paginator = this.paginator;
  }

  //刪除職稱資料
  deleteJobtitle(id: any) {
    Swal.fire({
      title: '您是否確定要刪除此職稱?',
      text: "刪除後無法恢復!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除!',
      cancelButtonText: '取消!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /*送審 */
        this.adminHttpApiService.deleteJobTitle(id).subscribe(
          res => {
            /*新增一筆紀錄 */
            //this.uploadTransactionRecordRequests()
          }
        )

        Swal.fire(
          '已刪除!',
          '此部門已刪除.',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            //取得部門資料列表
            this.getJobtitleDataList()
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
    this.dialog.open(PositionNewDialogComponent);
  }

  editItem() {
    this.dialog.open(PositionEditDialogComponent);
  }

  doPostEdit(item: any): void {
    this.dialog.open(PositionEditDialogComponent, {
      data: {
        item
      }
    });
    //console.log(item)
  }












  openCreate(): void {
    const dialogRef = this.dialog.open(CreatepositionComponent, {
      hasBackdrop: false,
      height: '600px',
      width: '600px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('關閉');

    });
  }

  openEdit(row: any): void {
    const dialogRef = this.dialog.open(EditpositionComponent, {
      hasBackdrop: false,
      height: '600px',
      width: '600px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('close');
    })
  }
  openDel(row: any): void {
    const dialogRef = this.dialog.open(DelpositionComponent, {
      hasBackdrop: false,
      height: '400px',
      width: '400px',
      data: row
    });
  }

}
