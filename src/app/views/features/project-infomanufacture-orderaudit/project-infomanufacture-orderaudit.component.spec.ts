import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfomanufactureOrderauditComponent } from './project-infomanufacture-orderaudit.component';

describe('ProjectInfomanufactureOrderauditComponent', () => {
  let component: ProjectInfomanufactureOrderauditComponent;
  let fixture: ComponentFixture<ProjectInfomanufactureOrderauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfomanufactureOrderauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfomanufactureOrderauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
