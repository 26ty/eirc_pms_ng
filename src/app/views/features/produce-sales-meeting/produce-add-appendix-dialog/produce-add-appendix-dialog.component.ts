import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

export const MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-produce-add-appendix-dialog',
  templateUrl: './produce-add-appendix-dialog.component.html',
  styleUrls: ['./produce-add-appendix-dialog.component.scss']
})
export class ProduceAddAppendixDialogComponent implements OnInit {

  fileName = '';
  addappendixForm: FormGroup;

  @Input() title!: string;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    ) {}
  /*
  constructor(
    private fb: FormBuilder,
  ) {
    this.addappendixForm = this.fb.group({
      creat_at: ['', [Validators.required]],
      select: [, [Validators.required, Validators.minLength(6)]],
      min_length: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }*/

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}

}
