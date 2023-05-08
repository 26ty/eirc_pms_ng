import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderSaComponent } from './manufacture-order-sa.component';

describe('ManufactureOrderSaComponent', () => {
  let component: ManufactureOrderSaComponent;
  let fixture: ComponentFixture<ManufactureOrderSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderSaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
