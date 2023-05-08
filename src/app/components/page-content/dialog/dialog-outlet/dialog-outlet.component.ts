import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-outlet',
  templateUrl: './dialog-outlet.component.html',
  styleUrls: ['./dialog-outlet.component.scss']
})
export class DialogOutletComponent implements OnInit {

  @Input()title!: string;
  @Input() closeStatus: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
