import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoManufactureOrderListComponent } from './project-info-manufacture-order-list.component';

describe('ProjectInfoManufactureOrderListComponent', () => {
  let component: ProjectInfoManufactureOrderListComponent;
  let fixture: ComponentFixture<ProjectInfoManufactureOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoManufactureOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoManufactureOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
