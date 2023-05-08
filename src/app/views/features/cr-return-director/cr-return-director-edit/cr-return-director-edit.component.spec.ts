import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrReturnDirectorEditComponent } from './cr-return-director-edit.component';

describe('CrReturnDirectorEditComponent', () => {
  let component: CrReturnDirectorEditComponent;
  let fixture: ComponentFixture<CrReturnDirectorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrReturnDirectorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrReturnDirectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
