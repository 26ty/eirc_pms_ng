import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrPmReturnComponent } from './cr-pm-return.component';

describe('CrPmReturnComponent', () => {
  let component: CrPmReturnComponent;
  let fixture: ComponentFixture<CrPmReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrPmReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrPmReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
