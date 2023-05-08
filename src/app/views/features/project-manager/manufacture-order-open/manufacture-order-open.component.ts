import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manufacture-order-open',
  templateUrl: './manufacture-order-open.component.html',
  styleUrls: ['./manufacture-order-open.component.scss']
})
export class ManufactureOrderOpenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  cancelItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/projectinfo/project-manager');
  }
}
