import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetDialogComponent } from './meet-dialog.component';

describe('MeetDialogComponent', () => {
  let component: MeetDialogComponent;
  let fixture: ComponentFixture<MeetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
