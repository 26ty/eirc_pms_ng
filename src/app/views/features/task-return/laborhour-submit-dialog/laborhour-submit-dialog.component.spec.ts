import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborhourSubmitDialogComponent } from './laborhour-submit-dialog.component';

describe('LaborhourSubmitDialogComponent', () => {
  let component: LaborhourSubmitDialogComponent;
  let fixture: ComponentFixture<LaborhourSubmitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborhourSubmitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborhourSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
