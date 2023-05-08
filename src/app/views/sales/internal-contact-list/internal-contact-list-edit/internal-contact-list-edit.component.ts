import { recordData } from './../../../../shared/data/record-data';
import { Component, OnInit } from '@angular/core';

export interface recordData {
  record_date:string;
  department:string;
  record_content:string;
}

export interface productData {
  product_demand:string;
  num:string;
  unit:string;
  action_checkbox:string;
}

export interface productDemandData {
  action_delete:string;
  product_info:string;
  f_id:string;
  num:string;
  unit:string;
  create_time:string;
  date_for_deliver:string;
}

const recordData:recordData[] = [
  {
    record_date: '2020/05/20 10:10:10',
    department: '機械研發部',
    record_content: '單據確認完工',
  },
  {
    record_date: '2020/05/20 10:10:10',
    department: '軟體研發部-Vision',
    record_content: '儲存工作內容',
  },
  {
    record_date: '2020/05/20 10:10:10',
    department: '軟體研發部-Vision',
    record_content: '儲存工作內容',
  },
  {
    record_date: '2020/05/20 10:10:10',
    department: '軟體研發部-Vision',
    record_content: '儲存工作內容',
  },
  {
    record_date: '2020/05/20 10:10:10',
    department: '軟體研發部-Motion',
    record_content: '儲存工作內容',
  },
];

const productData:productData[] = [
  {
    product_demand:'砝碼',
    num:'10',
    unit:'kg',
    action_checkbox:''
  },
  {
    product_demand:'量尺',
    num:'20',
    unit:'捲',
    action_checkbox:''
  }
]

const productDemandData:productDemandData[] = [
  {
    action_delete:'',
    product_info:'散熱片吸嘴模組實心(LID)',
    f_id:'DS3011A001000',
    num:'2',
    unit:'組',
    create_time:'2021/08/26',
    date_for_deliver:'2021/08/08'
  },
  {
    action_delete:'',
    product_info:'散熱片吸嘴模組實心(RING)',
    f_id:'DS3011A002000',
    num:'1',
    unit:'pcs',
    create_time:'2021/06/26',
    date_for_deliver:'2021/08/08'
  },
  {
    action_delete:'',
    product_info:'點膠定位塊組-無吸嘴式',
    f_id:'DS3011A003000',
    num:'2',
    unit:'組',
    create_time:'2021/08/26',
    date_for_deliver:'2021/08/08'
  },
  {
    action_delete:'',
    product_info:'植片定位塊組-無吸嘴式',
    f_id:'DS3011A004000',
    num:'1',
    unit:'pcs',
    create_time:'2021/08/26',
    date_for_deliver:'2021/08/08'
  },
  {
    action_delete:'',
    product_info:'上治具-標準式-實心(LID)',
    f_id:'DS3011A005000',
    num:'1',
    unit:'pcs',
    create_time:'2021/08/26',
    date_for_deliver:'2021/08/08'
  }

]
@Component({
  selector: 'app-internal-contact-list-edit',
  templateUrl: './internal-contact-list-edit.component.html',
  styleUrls: ['./internal-contact-list-edit.component.scss']
})
export class InternalContactListEditComponent implements OnInit {

  displayedColumn: string[] = ['record_date', 'department', 'record_content'];
  datasSource = recordData;

  displayedColumn_1: string[] = ['action_delete', 'product_info', 'f_id','num','unit','create_time','date_for_deliver'];
  datasSource_1 = productDemandData;

  constructor() { }

  ngOnInit(): void {
  }

  //離開修改頁面
  // 選擇單項
  cancelItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/sales/internal-contact-list');
  }

  //按鈕狀態先給false
  btnStatus=false;
  //異動處理按鈕點擊事件
  btnStatusClick(){
    this.btnStatus = !this.btnStatus;
  }
  
}
