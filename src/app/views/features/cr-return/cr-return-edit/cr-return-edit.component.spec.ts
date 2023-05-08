import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrReturnEditComponent } from './cr-return-edit.component';

describe('CrReturnEditComponent', () => {
  let component: CrReturnEditComponent;
  let fixture: ComponentFixture<CrReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
