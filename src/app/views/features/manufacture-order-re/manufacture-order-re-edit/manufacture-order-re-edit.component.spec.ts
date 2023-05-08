import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderReEditComponent } from './manufacture-order-re-edit.component';

describe('ManufactureOrderReEditComponent', () => {
  let component: ManufactureOrderReEditComponent;
  let fixture: ComponentFixture<ManufactureOrderReEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderReEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderReEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
