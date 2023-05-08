import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

  //   { provide: MAT_DATE_FORMATS, useValue: MODE_FORMATS },
  // ],
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;

  @Input() title!: string;

  constructor(
    private fb: FormBuilder,
  ) {
    this.addForm = this.fb.group({
      creat_at: ['', [Validators.required]],
      select: [, [Validators.required, Validators.minLength(6)]],
      min_length: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }

  ngOnInit(): void {
  }


  // 送出
  submit(formValue: any) {
    // if (formValue.new_password !== formValue.confirm_password) {
    //   alert('請確認密碼');
    //   return;
    // }
    if (this.addForm.valid) {
      //   this.updateMemberPassword(member);

    } else {
      this.markFormGroupTouched(this.addForm);
    }
  }

  // 將formgroup改為觸碰狀態
  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

}
