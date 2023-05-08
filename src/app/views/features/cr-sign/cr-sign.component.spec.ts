import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSignComponent } from './cr-sign.component';

describe('CrSignComponent', () => {
  let component: CrSignComponent;
  let fixture: ComponentFixture<CrSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
