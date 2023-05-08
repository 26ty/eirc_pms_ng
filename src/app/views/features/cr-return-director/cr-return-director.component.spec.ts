import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrReturnDirectorComponent } from './cr-return-director.component';

describe('CrReturnDirectorComponent', () => {
  let component: CrReturnDirectorComponent;
  let fixture: ComponentFixture<CrReturnDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrReturnDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrReturnDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
