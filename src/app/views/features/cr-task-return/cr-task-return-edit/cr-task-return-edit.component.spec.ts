import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrTaskReturnEditComponent } from './cr-task-return-edit.component';

describe('CrTaskReturnEditComponent', () => {
  let component: CrTaskReturnEditComponent;
  let fixture: ComponentFixture<CrTaskReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrTaskReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrTaskReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
