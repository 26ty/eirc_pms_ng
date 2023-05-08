import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseTopComponent } from './cr-close-top.component';

describe('CrCloseTopComponent', () => {
  let component: CrCloseTopComponent;
  let fixture: ComponentFixture<CrCloseTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
