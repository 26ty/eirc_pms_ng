import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrReturnTopEditComponent } from './cr-return-top-edit.component';

describe('CrReturnTopEditComponent', () => {
  let component: CrReturnTopEditComponent;
  let fixture: ComponentFixture<CrReturnTopEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrReturnTopEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrReturnTopEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
