import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTaskReturnEditComponent } from './pm-task-return-edit.component';

describe('PmTaskReturnEditComponent', () => {
  let component: PmTaskReturnEditComponent;
  let fixture: ComponentFixture<PmTaskReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmTaskReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmTaskReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
