import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderMgEditComponent } from './manufacture-order-mg-edit.component';

describe('ManufactureOrderMgEditComponent', () => {
  let component: ManufactureOrderMgEditComponent;
  let fixture: ComponentFixture<ManufactureOrderMgEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderMgEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderMgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
