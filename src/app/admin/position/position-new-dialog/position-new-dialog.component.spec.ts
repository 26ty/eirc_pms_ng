import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionNewDialogComponent } from './position-new-dialog.component';

describe('PositionNewDialogComponent', () => {
  let component: PositionNewDialogComponent;
  let fixture: ComponentFixture<PositionNewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionNewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
