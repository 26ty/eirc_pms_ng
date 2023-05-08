import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseEditComponent } from './cr-close-edit.component';

describe('CrCloseEditComponent', () => {
  let component: CrCloseEditComponent;
  let fixture: ComponentFixture<CrCloseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
