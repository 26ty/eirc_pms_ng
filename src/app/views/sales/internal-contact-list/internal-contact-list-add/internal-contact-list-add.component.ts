import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-contact-list-add',
  templateUrl: './internal-contact-list-add.component.html',
  styleUrls: ['./internal-contact-list-add.component.scss']
})
export class InternalContactListAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cancelItem() {
    //this.selectedItem = item;
    // const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/sales/internal-contact-list');
  }
}
