import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSignEditComponent } from './cr-sign-edit.component';

describe('CrSignEditComponent', () => {
  let component: CrSignEditComponent;
  let fixture: ComponentFixture<CrSignEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrSignEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
