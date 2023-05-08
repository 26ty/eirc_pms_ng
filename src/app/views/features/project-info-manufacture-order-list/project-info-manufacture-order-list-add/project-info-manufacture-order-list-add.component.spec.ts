import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoManufactureOrderListAddComponent } from './project-info-manufacture-order-list-add.component';

describe('ProjectInfoManufactureOrderListAddComponent', () => {
  let component: ProjectInfoManufactureOrderListAddComponent;
  let fixture: ComponentFixture<ProjectInfoManufactureOrderListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoManufactureOrderListAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoManufactureOrderListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
