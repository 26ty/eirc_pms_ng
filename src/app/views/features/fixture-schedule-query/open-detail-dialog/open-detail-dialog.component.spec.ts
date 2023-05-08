import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDetailDialogComponent } from './open-detail-dialog.component';

describe('OpenDetailDialogComponent', () => {
  let component: OpenDetailDialogComponent;
  let fixture: ComponentFixture<OpenDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
