import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSignManagerEditComponent } from './cr-sign-manager-edit.component';

describe('CrSignManagerEditComponent', () => {
  let component: CrSignManagerEditComponent;
  let fixture: ComponentFixture<CrSignManagerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrSignManagerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSignManagerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
