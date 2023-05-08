import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseTopEditComponent } from './cr-close-top-edit.component';

describe('CrCloseTopEditComponent', () => {
  let component: CrCloseTopEditComponent;
  let fixture: ComponentFixture<CrCloseTopEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseTopEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseTopEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
