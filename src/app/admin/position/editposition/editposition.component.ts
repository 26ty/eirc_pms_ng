import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OrganizationService } from '../../../_services/organization.service';
import {  Position, Departments, EditPosition } from '../../models/organization';


@Component({
  templateUrl: './editposition.component.html',
  styleUrls: ['./editposition.component.scss']
})
export class EditpositionComponent implements OnInit {
  departmentItem: Departments[] = [];
  filteredDpOptions: Observable<Departments[]> | undefined;
  editPositionForm: FormGroup = new FormGroup({
    department: new FormControl({ department: this.data.department }),
    position: new FormControl(this.data.position, Validators.required),
    review_level: new FormControl(this.data.review_level)
   });

  constructor(public dialogRef: MatDialogRef<EditpositionComponent>, @Inject(MAT_DIALOG_DATA) private data: Position, private organizationService: OrganizationService) { }

  ngOnInit(): void {  this.organizationService.fetchDepartment().subscribe(
    data => {
      this.departmentItem = data;
    }
  );

  this.filteredDpOptions = this.editPositionForm.valueChanges
    .pipe(
       startWith(''),
      map(value => typeof value === 'string' ? value : value.department),

      map(department => department ? this._filterDepartment(department) : this.departmentItem.slice()),

  );
}

displayDpFn(departments: Departments): string {

  return departments && departments.department ? departments.department : '';
}

private _filterDepartment(department: string): Departments[] {
  const filterValue = department.toString().toLowerCase();

  return this.departmentItem.filter(departmentData => departmentData.department.toLowerCase().indexOf(filterValue) === 0);
}

onNoClick(): void {
  this.dialogRef.close();
}
onSubmit(): void {

  const departments = this.editPositionForm.get('department')?.value;
  let { department } = departments;



    this.editPositionForm.get('department')?.setValue(department);

    const organizationItem: EditPosition = this.editPositionForm.value;
  this.organizationService.editPosition(this.data.ID, organizationItem).subscribe(
    data => {
      console.log(data);
      this.dialogRef.close();
      window.location.reload();
    }
  )
}


}
