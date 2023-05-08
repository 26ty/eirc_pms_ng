import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseInformEditComponent } from './cr-close-inform-edit.component';

describe('CrCloseInformEditComponent', () => {
  let component: CrCloseInformEditComponent;
  let fixture: ComponentFixture<CrCloseInformEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseInformEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseInformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
