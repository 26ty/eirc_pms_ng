import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborhourDirectAuditEditComponent } from './laborhour-direct-audit-edit.component';

describe('LaborhourDirectAuditEditComponent', () => {
  let component: LaborhourDirectAuditEditComponent;
  let fixture: ComponentFixture<LaborhourDirectAuditEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborhourDirectAuditEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborhourDirectAuditEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
