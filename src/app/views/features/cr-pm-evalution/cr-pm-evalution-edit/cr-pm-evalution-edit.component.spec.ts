import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrPmEvalutionEditComponent } from './cr-pm-evalution-edit.component';

describe('CrPmEvalutionEditComponent', () => {
  let component: CrPmEvalutionEditComponent;
  let fixture: ComponentFixture<CrPmEvalutionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrPmEvalutionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrPmEvalutionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
