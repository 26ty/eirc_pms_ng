import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmReturnEditComponent } from './pm-return-edit.component';

describe('PmReturnEditComponent', () => {
  let component: PmReturnEditComponent;
  let fixture: ComponentFixture<PmReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
