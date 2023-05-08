import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderQcEditComponent } from './manufacture-order-qc-edit.component';

describe('ManufactureOrderQcEditComponent', () => {
  let component: ManufactureOrderQcEditComponent;
  let fixture: ComponentFixture<ManufactureOrderQcEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderQcEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderQcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
