import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { HttpApiService } from './../../../api/http-api.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component'
@Component({
  selector: 'app-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.scss']
})
export class ProjectTemplateComponent implements OnInit {


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;

  // table 資料
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['code', 'p_name', 'action_edit'];

  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale
  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;

  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';

  // 年分
  year: any;

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog,
    private HttpApiService: HttpApiService,
  ) { }

  ngOnInit(): void {
    this.setPaginator();
    this.getProjectTemplateRequest()
  }

  ngAfterViewInit() {
    // 設定資料排序
    this.dataSource.sort = this.sort;

    // 執行顯示資料
    setTimeout(() => {
      //this.showData();
    }, 0);
  }

  projectTemplateData: any
  project_type_id = 'ef242726-7b97-4943-9318-5eb27c1bb8b5'
  showTableData:any = {}
  pushData:any =[]
  getProjectTemplateRequest() {
    this.HttpApiService.getProjectRequest_t(1, 20).subscribe(
      projectTemplateRequest => {
        this.projectTemplateData = projectTemplateRequest.body.project
        
        console.log(typeof(this.projectTemplateData))
        for(let i in this.projectTemplateData){
          //console.log(this.projectTemplateData[i].origin_id)
          if(this.projectTemplateData[i].origin_id == this.project_type_id){
            console.log(this.projectTemplateData[i].origin_id)
            this.pushData.push(this.projectTemplateData[i])
            console.log(this.pushData)
          }
        }
        this.showData(this.pushData)
      }
    )
  }

  // 顯示資料
  showData(data: any) {
    this.dataSource.data = data;//將資料帶入
    this.totalCount = data.length;//計算資料長度
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;


  }

  //搜尋資料
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // 設定分頁器參數
  setPaginator() {
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} - ${endIndex} 筆、共 ${length} 筆`;
    };

    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';

  }

  // 過濾資料
  filterData() {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      // return data.BuyerPartyID.indexOf(filter) !== -1;
      // return data.BuyerPartyID.toLowerCase().includes(filter) || data.ID.includes(filter) || data.InvoiceNO_KUT.toLowerCase().includes(filter);
      return this.getCheckIncludes(data, ['ObjectID', 'ID', 'InvoiceNO_KUT'], filter);
    };
  }

  // 取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字
  getCheckIncludes(array: any, titles: string[], keyword: string) {
    // console.log(array);
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }

  // filter 輸入關鍵字
  keyupSearch(event: any) {
    this.dataSource.filter = event.toLowerCase();
  }


  // 檢查月份 未完成
  checkMonth(month: number) {
    const thisYear = new Date(this.now).getFullYear();
    const thisMonth = new Date(this.now).getMonth();
    const selectYear = new Date(this.year).getFullYear();
    return;
    if (thisYear !== selectYear) {
      return false;
    }
    const currentDate = new Date();
    currentDate.setFullYear(thisYear);
    currentDate.setMonth(month - 1);
    currentDate.setDate(+1);
    currentDate.setHours(0, 0, 1);
    console.log(currentDate);
    const myFormattedDate = this.pipe.transform(currentDate, this.formatStr);
    console.log(myFormattedDate);

    return
  }

  // 選擇月份時關閉
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }

  editItem(item: any) {
    this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/projectinfo/project-template-edit');
  }

  addItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    ///window.location.assign('main/projectinfo/project-template-add');
    this.dialog.open(AddDialogComponent)
  }


}
