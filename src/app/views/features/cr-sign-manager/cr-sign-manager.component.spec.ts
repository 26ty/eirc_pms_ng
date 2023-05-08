import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSignManagerComponent } from './cr-sign-manager.component';

describe('CrSignManagerComponent', () => {
  let component: CrSignManagerComponent;
  let fixture: ComponentFixture<CrSignManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrSignManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSignManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
