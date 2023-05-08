import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdInterviewDialogComponent } from './cd-interview-dialog.component';

describe('CdInterviewDialogComponent', () => {
  let component: CdInterviewDialogComponent;
  let fixture: ComponentFixture<CdInterviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdInterviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdInterviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
