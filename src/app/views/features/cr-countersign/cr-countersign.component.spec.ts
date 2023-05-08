import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCountersignComponent } from './cr-countersign.component';

describe('CrCountersignComponent', () => {
  let component: CrCountersignComponent;
  let fixture: ComponentFixture<CrCountersignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCountersignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCountersignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
