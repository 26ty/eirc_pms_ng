import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequestDialogComponent } from './customer-request-dialog.component';

describe('CustomerRequestDialogComponent', () => {
  let component: CustomerRequestDialogComponent;
  let fixture: ComponentFixture<CustomerRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
