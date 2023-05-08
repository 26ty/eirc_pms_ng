import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrFollowWorkComponent } from './cr-follow-work.component';

describe('CrFollowWorkComponent', () => {
  let component: CrFollowWorkComponent;
  let fixture: ComponentFixture<CrFollowWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrFollowWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrFollowWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
