import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceSalesMeetingEditComponent } from './produce-sales-meeting-edit.component';

describe('ProduceSalesMeetingEditComponent', () => {
  let component: ProduceSalesMeetingEditComponent;
  let fixture: ComponentFixture<ProduceSalesMeetingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceSalesMeetingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceSalesMeetingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
