import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmReturnComponent } from './pm-return.component';

describe('PmReturnComponent', () => {
  let component: PmReturnComponent;
  let fixture: ComponentFixture<PmReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PmReturnComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
