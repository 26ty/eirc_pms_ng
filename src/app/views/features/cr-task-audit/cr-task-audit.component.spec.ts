import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrTaskAuditComponent } from './cr-task-audit.component';

describe('CrTaskAuditComponent', () => {
  let component: CrTaskAuditComponent;
  let fixture: ComponentFixture<CrTaskAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrTaskAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrTaskAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
