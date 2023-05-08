import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderQcComponent } from './manufacture-order-qc.component';

describe('ManufactureOrderQcComponent', () => {
  let component: ManufactureOrderQcComponent;
  let fixture: ComponentFixture<ManufactureOrderQcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderQcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
