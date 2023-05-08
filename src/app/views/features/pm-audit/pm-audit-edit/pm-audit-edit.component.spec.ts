import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmAuditEditComponent } from './pm-audit-edit.component';

describe('PmAuditEditComponent', () => {
  let component: PmAuditEditComponent;
  let fixture: ComponentFixture<PmAuditEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmAuditEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmAuditEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
