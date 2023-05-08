import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseDirectorEditComponent } from './cr-close-director-edit.component';

describe('CrCloseDirectorEditComponent', () => {
  let component: CrCloseDirectorEditComponent;
  let fixture: ComponentFixture<CrCloseDirectorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseDirectorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseDirectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
