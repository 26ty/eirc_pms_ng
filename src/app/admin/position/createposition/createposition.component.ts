import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OrganizationService } from '../../../_services/organization.service';
import {  CreatePosition, Departments } from '../../models/organization';

@Component({
  templateUrl: './createposition.component.html',
  styleUrls: ['./createposition.component.scss']
})
export class CreatepositionComponent implements OnInit {

  departmentItem: Departments[] = [];
  filteredDpOptions: Observable<Departments[]> | undefined;
  createPositionForm: FormGroup = new FormGroup({
    department: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    review_level: new FormControl(null)
   });
  constructor(public dialogRef: MatDialogRef<CreatepositionComponent>, private organizationService: OrganizationService) { }


  ngOnInit(): void {
    this.organizationService.fetchDepartment().subscribe(
      data => {
        this.departmentItem = data;
      }
    );

    this.filteredDpOptions = this.createPositionForm.valueChanges
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

    const departments = this.createPositionForm.get('department')?.value;
    const { department } = departments;
    this.createPositionForm.get('department')?.setValue(department);
    const organizationItem: CreatePosition = this.createPositionForm.value;
    this.organizationService.positionCreate(organizationItem).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
        window.location.reload();
      }
    )
  }

}
