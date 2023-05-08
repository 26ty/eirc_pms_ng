import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCountersignDirectorEditComponent } from './cr-countersign-director-edit.component';

describe('CrCountersignDirectorEditComponent', () => {
  let component: CrCountersignDirectorEditComponent;
  let fixture: ComponentFixture<CrCountersignDirectorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCountersignDirectorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCountersignDirectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
