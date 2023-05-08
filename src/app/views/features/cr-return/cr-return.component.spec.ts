import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrReturnComponent } from './cr-return.component';

describe('CrReturnComponent', () => {
  let component: CrReturnComponent;
  let fixture: ComponentFixture<CrReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
