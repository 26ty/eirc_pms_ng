import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseManufactureEditComponent } from './cr-close-manufacture-edit.component';

describe('CrCloseManufactureEditComponent', () => {
  let component: CrCloseManufactureEditComponent;
  let fixture: ComponentFixture<CrCloseManufactureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseManufactureEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseManufactureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
