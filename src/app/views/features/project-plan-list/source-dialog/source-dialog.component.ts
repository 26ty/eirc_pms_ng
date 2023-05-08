import { sourceData } from './../../../../shared/data/source-data';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { projectData } from './../../../../shared/data/project-data';


export interface fixtureElement {
  //單據編號
  doc_code: string;
  //標題名稱
  doc_name: string;
  //預計開始與結束日
  pre_start_done: string;
  //發文者
  init_man: string;
  //發文單位
  init_department: string;
  //回覆日期
  re_date: string;
  //完成日期
  com_date: string;
}

const ELEMENT_DATA_2: fixtureElement[] = [
  { doc_code: '-', doc_name: '-', pre_start_done: '-', init_man: '-', init_department: '-', re_date: '-', com_date: '-' },
  { doc_code: '-', doc_name: '-', pre_start_done: '-', init_man: '-', init_department: '-', re_date: '-', com_date: '-' },
  { doc_code: '-', doc_name: '-', pre_start_done: '-', init_man: '-', init_department: '-', re_date: '-', com_date: '-' }
];

export interface source_Data {
  tasks_name: string;
  labor_start_done: string;
  percentage: string;
}

const ELEMENT_DATA_3: source_Data[] = [
  { tasks_name: '-', labor_start_done: '-', percentage: '-' }
];

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-source-dialog',
  templateUrl: './source-dialog.component.html',
  styleUrls: ['./source-dialog.component.scss']
})
export class SourceDialogComponent implements OnInit {



  // datasSource = ElEMENT_DATA;

  displayedColumns_2: string[] = ['doc_code', 'doc_name', 'pre_start_done', 'init_man', 'init_department', 're_date', 'com_date'];
  datasSource_2 = ELEMENT_DATA_2;
  clickedRows_2 = new Set<fixtureElement>();

  displayedColumns_3: string[] = ['tasks_name', 'labor_start_done', 'percentage'];
  datasSource_3 = ELEMENT_DATA_3;
  clickedRows_3 = new Set<source_Data>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  displayedColumns: string[] = ['task_code', 'task_name', 'labor_hour', 're_data', 'com_date', 'description'];

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  // MatPaginator Output
  pageEvent!: PageEvent;


  // table 資料
  dataSource = new MatTableDataSource<any>();

  // 現在時間
  now = Date.now();
  nowDate = new Date(this.now);

  // 時間格式
  formatStr = 'YYYY-MM-d hh:mm:ss';

  // 年分
  year: any;

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setPaginator();
  }
  ngAfterViewInit() {
    // 設定資料排序
    this.dataSource.sort = this.sort;

    // 執行顯示資料
    setTimeout(() => {
      this.showData();
    }, 0);
  }

  // 顯示資料
  showData() {
    this.totalCount = projectData.length;
    this.dataSource.data = projectData;
    this.dataSource.paginator = this.paginator;
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

}
