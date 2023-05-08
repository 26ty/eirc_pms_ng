import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseManufactureComponent } from './cr-close-manufacture.component';

describe('CrCloseManufactureComponent', () => {
  let component: CrCloseManufactureComponent;
  let fixture: ComponentFixture<CrCloseManufactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseManufactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
