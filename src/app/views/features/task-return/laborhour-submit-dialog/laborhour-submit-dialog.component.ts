import { HttpApiService } from './../../../../api/http-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-laborhour-submit-dialog',
  templateUrl: './laborhour-submit-dialog.component.html',
  styleUrls: ['./laborhour-submit-dialog.component.scss']
})
export class LaborhourSubmitDialogComponent implements OnInit {

  isLinear = false;
  addForm: FormGroup;

  @Input() title!: string;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  LHDatas: any;

  uploadLaborHourRequest(): void {

    let laborHourDatas: any = {};//接收資料
    laborHourDatas['category'] = this.LHDatas.message.category;
    laborHourDatas['title'] = this.LHDatas.message.title;
    laborHourDatas['nature'] = this.LHDatas.message.nature;
    laborHourDatas['date_for_start'] = this.LHDatas.message.date_for_start;
    laborHourDatas['time_for_start'] = this.LHDatas.message.time_for_start;
    laborHourDatas['time_for_end'] = this.LHDatas.message.time_for_end;

    this.HttpApiService.uploadLaborHourRequest(laborHourDatas).
      subscribe(CR => {
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

}
