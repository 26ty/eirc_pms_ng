import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoManufactureOrderListEditComponent } from './project-info-manufacture-order-list-edit.component';

describe('ProjectInfoManufactureOrderListEditComponent', () => {
  let component: ProjectInfoManufactureOrderListEditComponent;
  let fixture: ComponentFixture<ProjectInfoManufactureOrderListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoManufactureOrderListEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoManufactureOrderListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
