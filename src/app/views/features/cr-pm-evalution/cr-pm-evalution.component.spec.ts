import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrPmEvalutionComponent } from './cr-pm-evalution.component';

describe('CrPmEvalutionComponent', () => {
  let component: CrPmEvalutionComponent;
  let fixture: ComponentFixture<CrPmEvalutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrPmEvalutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrPmEvalutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
