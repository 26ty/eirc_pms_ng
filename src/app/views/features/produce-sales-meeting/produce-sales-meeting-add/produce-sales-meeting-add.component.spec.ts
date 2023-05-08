import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceSalesMeetingAddComponent } from './produce-sales-meeting-add.component';

describe('ProduceSalesMeetingAddComponent', () => {
  let component: ProduceSalesMeetingAddComponent;
  let fixture: ComponentFixture<ProduceSalesMeetingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceSalesMeetingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceSalesMeetingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
