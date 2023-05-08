import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderSaEditComponent } from './manufacture-order-sa-edit.component';

describe('ManufactureOrderSaEditComponent', () => {
  let component: ManufactureOrderSaEditComponent;
  let fixture: ComponentFixture<ManufactureOrderSaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderSaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderSaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
