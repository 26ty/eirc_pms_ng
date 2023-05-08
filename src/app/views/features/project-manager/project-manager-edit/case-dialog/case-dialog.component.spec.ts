import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDialogComponent } from './case-dialog.component';

describe('CaseDialogComponent', () => {
  let component: CaseDialogComponent;
  let fixture: ComponentFixture<CaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
