import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCountersignDirectorComponent } from './cr-countersign-director.component';

describe('CrCountersignDirectorComponent', () => {
  let component: CrCountersignDirectorComponent;
  let fixture: ComponentFixture<CrCountersignDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCountersignDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCountersignDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
