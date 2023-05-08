import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSignDirectorEditComponent } from './cr-sign-director-edit.component';

describe('CrSignDirectorEditComponent', () => {
  let component: CrSignDirectorEditComponent;
  let fixture: ComponentFixture<CrSignDirectorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrSignDirectorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSignDirectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
