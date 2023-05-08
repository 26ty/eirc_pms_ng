import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseComponent } from './cr-close.component';

describe('CrCloseComponent', () => {
  let component: CrCloseComponent;
  let fixture: ComponentFixture<CrCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
