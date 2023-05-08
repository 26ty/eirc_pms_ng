import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrPmReturnEditComponent } from './cr-pm-return-edit.component';

describe('CrPmReturnEditComponent', () => {
  let component: CrPmReturnEditComponent;
  let fixture: ComponentFixture<CrPmReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrPmReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrPmReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
