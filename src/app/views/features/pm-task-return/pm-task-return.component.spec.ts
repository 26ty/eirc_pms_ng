import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTaskReturnComponent } from './pm-task-return.component';

describe('PmTaskReturnComponent', () => {
  let component: PmTaskReturnComponent;
  let fixture: ComponentFixture<PmTaskReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmTaskReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmTaskReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
