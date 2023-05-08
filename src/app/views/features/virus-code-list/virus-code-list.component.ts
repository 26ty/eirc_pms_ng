import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  software_name:string;
  software_number:string;
  machine_number:string;
  creat_date:string;
}

const ELEMENT_DATA:PeriodicElement[] = [
  {software_name:'Kapersky',software_number:'Z4GAA-ZY287-DFWTB 驗證碼:ZHUC9',machine_number:'SR1200-0007 NO.1',creat_date:'2020/02/27'},
];

@Component({
  selector: 'app-virus-code-list',
  templateUrl: './virus-code-list.component.html',
  styleUrls: ['./virus-code-list.component.scss']
})
export class VirusCodeListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns:string[] = ['software_name', 'software_number', 'machine_number', 'creat_date'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

}
