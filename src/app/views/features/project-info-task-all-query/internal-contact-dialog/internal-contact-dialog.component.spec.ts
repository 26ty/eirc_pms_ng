import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalContactDialogComponent } from './internal-contact-dialog.component';

describe('InternalContactDialogComponent', () => {
  let component: InternalContactDialogComponent;
  let fixture: ComponentFixture<InternalContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalContactDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
