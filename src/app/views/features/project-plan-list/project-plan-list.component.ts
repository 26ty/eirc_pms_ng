import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { projectPlanListCaseData } from './../../../shared/data/project-plan-list-case';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

export interface CaseElement {
  //任務名稱
  task_name: string;
  //工時(開始時間-結束時間)
  labor_hour: string;
  //負責人員
  task_principal: string;
  //實際工時
  act_start_done: string;
  //附件
  file: string;
  //備註說明
  description: string;
  //編輯管理
  action_edit: string;
  //檢視按鈕
  action_detail: string;
}

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
  selector: 'app-project-plan-list',
  templateUrl: './project-plan-list.component.html',
  styleUrls: ['./project-plan-list.component.scss']
})
export class ProjectPlanListComponent implements OnInit {


  //彈性化選擇欄位
  toppings = new FormControl();
  toppingList: string[] = ['任務名稱', '工時', '負責人員', '實際工時', '附件', '備註說明'];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileUpdateDialog') fileUpdateDialog!: TemplateRef<any>;
  @ViewChild('EditDialog') EditDialog!: TemplateRef<any>;//caseEdit
  @ViewChild('sourceDialog') souceDialog!: TemplateRef<any>;//sourceEdit
  @ViewChild('worktimeDialog') worktimeDialog!: TemplateRef<any>;//worktime
  // 定義 datepipe 本地語言
  pipe = new DatePipe('en-US'); // Use your own locale

  displayedColumns: string[] = ['task_name', 'task_principal', 'labor_start_done', 'pre_labor_hour', 'description', 'act_start_done',
    'act_labor_hour', 'labor_hour_detail', 'action_source', 'action_file', 'action_edit'];

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

  /** 
  * @brief 顯示資料
  * @return 回傳有無成功顯示資料 */
  showData() {
    this.totalCount = projectPlanListCaseData.length;
    this.dataSource.data = projectPlanListCaseData;
    this.dataSource.paginator = this.paginator;
  }

  /** 
  * @brief 設定分頁器 */
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

  /** 
  * @brief 過濾資料 */
  filterData() {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      // return data.BuyerPartyID.indexOf(filter) !== -1;
      // return data.BuyerPartyID.toLowerCase().includes(filter) || data.ID.includes(filter) || data.InvoiceNO_KUT.toLowerCase().includes(filter);
      return this.getCheckIncludes(data, ['ObjectID', 'ID', 'InvoiceNO_KUT'], filter);
    };
  }


  /** 
  * @brief 取得要過濾哪些欄位 array資料  titles要過濾的欄位名稱 keyword關鍵字 */
  getCheckIncludes(array: any, titles: string[], keyword: string) {
    // console.log(array);
    return titles.some(i => {
      return array[i].toLowerCase().includes(keyword.toLowerCase());
    });
  }

  // 
  /** 
  * @brief filter 輸入關鍵字
  **/
  keyupSearch(event: any) {
    this.dataSource.filter = event.toLowerCase();
  }


  /** 
  * @brief 檢查月份 未完成 */
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

  /** 
  * @brief 選擇月份時關閉 */
  closeDatePicker(elem: MatDatepicker<any>, value: any) {
    this.year = value;
    elem.close();
  }


  /** 
  * @brief 彈跳視窗 */
  fileItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    const dialogRef = this.dialog.open(this.fileUpdateDialog);
  }


  editItem(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(this.EditDialog);
  }

  
  sourceItem(item: any) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(this.souceDialog);
  }


  worktimeItem() {
    const MatDialogRef = this.dialog.open(this.worktimeDialog);
  }
}
