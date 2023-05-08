import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfomanufactureOrderauditEditComponent } from './project-infomanufacture-orderaudit-edit.component';

describe('ProjectInfomanufactureOrderauditEditComponent', () => {
  let component: ProjectInfomanufactureOrderauditEditComponent;
  let fixture: ComponentFixture<ProjectInfomanufactureOrderauditEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfomanufactureOrderauditEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfomanufactureOrderauditEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
