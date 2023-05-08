import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureOrderReComponent } from './manufacture-order-re.component';

describe('ManufactureOrderReComponent', () => {
  let component: ManufactureOrderReComponent;
  let fixture: ComponentFixture<ManufactureOrderReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureOrderReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureOrderReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
