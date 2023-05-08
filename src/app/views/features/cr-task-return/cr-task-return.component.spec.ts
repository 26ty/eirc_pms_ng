import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrTaskReturnComponent } from './cr-task-return.component';

describe('CrTaskReturnComponent', () => {
  let component: CrTaskReturnComponent;
  let fixture: ComponentFixture<CrTaskReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrTaskReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrTaskReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
