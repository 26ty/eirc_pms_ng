import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceAddMeetingDialogComponent } from './produce-add-meeting-dialog.component';

describe('ProduceAddMeetingDialogComponent', () => {
  let component: ProduceAddMeetingDialogComponent;
  let fixture: ComponentFixture<ProduceAddMeetingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceAddMeetingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceAddMeetingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
