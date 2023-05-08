import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCountersignDirectorConfirmComponent } from './cr-countersign-director-confirm.component';

describe('CrCountersignDirectorConfirmComponent', () => {
  let component: CrCountersignDirectorConfirmComponent;
  let fixture: ComponentFixture<CrCountersignDirectorConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCountersignDirectorConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCountersignDirectorConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
