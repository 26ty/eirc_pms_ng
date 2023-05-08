import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentNewDialogComponent } from './department-new-dialog.component';

describe('DepartmentNewDialogComponent', () => {
  let component: DepartmentNewDialogComponent;
  let fixture: ComponentFixture<DepartmentNewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentNewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
