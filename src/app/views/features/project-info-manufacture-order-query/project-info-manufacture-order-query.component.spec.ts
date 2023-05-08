import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoManufactureOrderQueryComponent } from './project-info-manufacture-order-query.component';

describe('ProjectInfoManufactureOrderQueryComponent', () => {
  let component: ProjectInfoManufactureOrderQueryComponent;
  let fixture: ComponentFixture<ProjectInfoManufactureOrderQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInfoManufactureOrderQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoManufactureOrderQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
