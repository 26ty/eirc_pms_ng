import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCountersignEditComponent } from './cr-countersign-edit.component';

describe('CrCountersignEditComponent', () => {
  let component: CrCountersignEditComponent;
  let fixture: ComponentFixture<CrCountersignEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCountersignEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCountersignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
