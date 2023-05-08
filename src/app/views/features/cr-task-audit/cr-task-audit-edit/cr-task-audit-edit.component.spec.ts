import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrTaskAuditEditComponent } from './cr-task-audit-edit.component';

describe('CrTaskAuditEditComponent', () => {
  let component: CrTaskAuditEditComponent;
  let fixture: ComponentFixture<CrTaskAuditEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrTaskAuditEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrTaskAuditEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
