import { Component, OnInit } from '@angular/core';


export interface contactListELement{
  j_id:string;
  summary:string;
  c_name:string;
  liaison_phone:string;
  creater:string;
  date_for_respond:string;
  date_for_demand:string;
  c_id:string;
  p_id:string;
  status:string;
  action_manufactrue:string;
  action_edit:string;
}
const ELEMENT_DATA:contactListELement[] =[
  {j_id:'20210824',summary:'TSMC DS3010-T',c_name:'楠梓',liaison_phone:'0912312312',
  creater:'林小明',date_for_respond:'2021/8/24',date_for_demand:'2021/09/18',
  c_id:'20210824',p_id:'E001-0001',status:'待審核',action_manufactrue:'',action_edit:''}
]
@Component({
  selector: 'app-internal-contact-list',
  templateUrl: './internal-contact-list.component.html',
  styleUrls: ['./internal-contact-list.component.scss']
})
export class InternalContactListComponent implements OnInit {
  displayedColumn:string[] = ['j_id','summary','c_name','liaison_phone','creater'
  ,'date_for_respond','date_for_demand','c_id','p_id','status','action_manufactrue','action_edit'];
  datasSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/sales/internal-contact-list-add');
  }

  editItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/sales/internal-contact-list-edit');
  }
}
