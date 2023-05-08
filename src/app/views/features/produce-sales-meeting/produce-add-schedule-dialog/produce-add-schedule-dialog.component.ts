import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, OnInit ,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  selector: 'app-produce-add-schedule-dialog',
  templateUrl: './produce-add-schedule-dialog.component.html',
  styleUrls: ['./produce-add-schedule-dialog.component.scss']
})
export class ProduceAddScheduleDialogComponent implements OnInit {

  addscheduleForm: FormGroup;

  @Input() title!: string;

  constructor(
    private fb: FormBuilder,
  ) {
    this.addscheduleForm = this.fb.group({
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
    if (this.addscheduleForm.valid) {
      //   this.updateMemberPassword(member);

    } else {
      this.markFormGroupTouched(this.addscheduleForm);
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

  addproduce() {
    //const dialogRef = this.dialog.open(this.editDialog);
    window.location.assign('main/projectinfo/produce-sales-meeting-add');
  }


}
