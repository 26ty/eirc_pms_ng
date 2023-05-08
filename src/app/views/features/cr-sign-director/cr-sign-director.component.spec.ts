import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrSignDirectorComponent } from './cr-sign-director.component';

describe('CrSignDirectorComponent', () => {
  let component: CrSignDirectorComponent;
  let fixture: ComponentFixture<CrSignDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrSignDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrSignDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
