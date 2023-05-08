import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborhourDirectAuditComponent } from './laborhour-direct-audit.component';

describe('LaborhourDirectAuditComponent', () => {
  let component: LaborhourDirectAuditComponent;
  let fixture: ComponentFixture<LaborhourDirectAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborhourDirectAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborhourDirectAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
