import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseDirectorComponent } from './cr-close-director.component';

describe('CrCloseDirectorComponent', () => {
  let component: CrCloseDirectorComponent;
  let fixture: ComponentFixture<CrCloseDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
