import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoingDialogComponent } from './doing-dialog.component';

describe('DoingDialogComponent', () => {
  let component: DoingDialogComponent;
  let fixture: ComponentFixture<DoingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoingDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
