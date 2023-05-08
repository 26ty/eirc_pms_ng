import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmAuditComponent } from './pm-audit.component';

describe('PmAuditComponent', () => {
  let component: PmAuditComponent;
  let fixture: ComponentFixture<PmAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
