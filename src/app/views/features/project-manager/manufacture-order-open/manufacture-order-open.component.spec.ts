import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderOpenComponent } from './manufacture-order-open.component';

describe('ManufactureOrderOpenComponent', () => {
  let component: ManufactureOrderOpenComponent;
  let fixture: ComponentFixture<ManufactureOrderOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
