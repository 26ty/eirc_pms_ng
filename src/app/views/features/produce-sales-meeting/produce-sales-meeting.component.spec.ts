import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceSalesMeetingComponent } from './produce-sales-meeting.component';

describe('ProduceSalesMeetingComponent', () => {
  let component: ProduceSalesMeetingComponent;
  let fixture: ComponentFixture<ProduceSalesMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceSalesMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceSalesMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
