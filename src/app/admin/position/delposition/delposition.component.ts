import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OrganizationService } from '../../../_services/organization.service';
import {  Position } from '../../models/organization';

@Component({
  templateUrl: './delposition.component.html',
  styleUrls: ['./delposition.component.scss']
})
export class DelpositionComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public dialogRef: MatDialogRef<DelpositionComponent>, @Inject(MAT_DIALOG_DATA) private data: Position, private organizationService: OrganizationService, private _sankBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  PositionDel(): void {

    this.organizationService.deletePosition(this.data.ID).subscribe(
      data => {
        this._sankBar.open(`${this.data.position}刪除成功`, '結束', {
          duration: 500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.dialogRef.close();
        window.location.reload();
      }
    )
  }

}
