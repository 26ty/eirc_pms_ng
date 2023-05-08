import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableData } from './../../../shared/data/table-data';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/dd',
  },
  display: {
    dateInput: 'YYYY/MM/dd',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // providers: [
  // //   `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  // //   application's root module. We provide it at the component level here, due to limitations of
  // //   our example generation script.
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

  //   { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
  // ],
})
export class TableComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;


  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  // 定義table標題
  displayedColumnsObj: any[] = [
    { cn: '日期', en: 'creat_at' },
    { cn: '下拉選擇', en: 'select' },
    { cn: '字串', en: 'min_length' },
  ];

  displayedColumns!: string[];

  // table date
  // table: Model[] = tableData;

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
    this.displayedColumns = this.displayedColumnsObj.map(i => i.en);

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
    this.totalCount = tableData.length;
    this.dataSource.data = tableData;
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

  // 開啟dialog
  // 新增
  addItem() {
    const dialogRef = this.dialog.open(this.addDialog);
  }

  // 選擇單項
  editItem(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(this.editDialog);
  }

  // 藉由ObjectID取得item
  getItemByObjectID(id: string) {
    if (!id) {
      return;
    }

    // return tableData.find(i => i.ParentObjectID === id);
  }

}
