import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetDialogComponent } from './edit-meet-dialog.component';

describe('EditMeetDialogComponent', () => {
  let component: EditMeetDialogComponent;
  let fixture: ComponentFixture<EditMeetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
