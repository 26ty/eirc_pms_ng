import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCountersignDirectorConfirmEditComponent } from './cr-countersign-director-confirm-edit.component';

describe('CrCountersignDirectorConfirmEditComponent', () => {
  let component: CrCountersignDirectorConfirmEditComponent;
  let fixture: ComponentFixture<CrCountersignDirectorConfirmEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCountersignDirectorConfirmEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCountersignDirectorConfirmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
