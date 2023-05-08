import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDemandFormComponent } from './customer-demand-form.component';

describe('CustomerDemandFormComponent', () => {
  let component: CustomerDemandFormComponent;
  let fixture: ComponentFixture<CustomerDemandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDemandFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDemandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
