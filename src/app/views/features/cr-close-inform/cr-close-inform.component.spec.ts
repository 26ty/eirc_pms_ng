import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseInformComponent } from './cr-close-inform.component';

describe('CrCloseInformComponent', () => {
  let component: CrCloseInformComponent;
  let fixture: ComponentFixture<CrCloseInformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseInformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
