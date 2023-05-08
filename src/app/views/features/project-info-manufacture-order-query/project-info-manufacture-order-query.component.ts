import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

interface toppinglist {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-project-info-manufacture-order-query',
  templateUrl: './project-info-manufacture-order-query.component.html',
  styleUrls: ['./project-info-manufacture-order-query.component.scss']
})
export class ProjectInfoManufactureOrderQueryComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  toppingList: toppinglist[] = [
    { value: 'm_id', viewValue: '單號' },
    { value: 'project_id', viewValue: '專案代號' },
    { value: 'order_name', viewValue: '主件品號' },
    { value: 'open_date', viewValue: '製令開啟期限' },
    { value: 'close_date', viewValue: '製令關閉期限' },
    { value: 'recipient', viewValue: '收文者' },
    { value: 'contact_person', viewValue: '業務負責人' },
    { value: 'status', viewValue: '狀態' },
  ];
  selectedValue = ['m_id', 'project_id', 'order_name', 'open_date', 'close_date', 'recipient', 'contact_person', 'status'];

  toppings = new FormControl();

  // 被選擇的資料
  selectedItem: any;

  // MatPaginator Inputs
  totalCount!: number;

  value = '';
  // table 資料
  dataSource = new MatTableDataSource<any>();

  constructor(
    private matPaginatorIntl: MatPaginatorIntl,
  ) { }

  ngOnInit(): void {
  }

  //顯示資料
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

  // 新增
  addItem() {

  }

  // 選擇單項
  editItem(item: any) {
    this.selectedItem = item;
    window.location.assign('main/projectinfo/project-manager-edit');
  }

}
