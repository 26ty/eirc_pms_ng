import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderMgComponent } from './manufacture-order-mg.component';

describe('ManufactureOrderMgComponent', () => {
  let component: ManufactureOrderMgComponent;
  let fixture: ComponentFixture<ManufactureOrderMgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderMgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
