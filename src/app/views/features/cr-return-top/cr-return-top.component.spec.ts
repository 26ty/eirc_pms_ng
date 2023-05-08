import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrReturnTopComponent } from './cr-return-top.component';

describe('CrReturnTopComponent', () => {
  let component: CrReturnTopComponent;
  let fixture: ComponentFixture<CrReturnTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrReturnTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrReturnTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
