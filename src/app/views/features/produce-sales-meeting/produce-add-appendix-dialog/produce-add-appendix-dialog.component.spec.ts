import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceAddAppendixDialogComponent } from './produce-add-appendix-dialog.component';

describe('ProduceAddAppendixDialogComponent', () => {
  let component: ProduceAddAppendixDialogComponent;
  let fixture: ComponentFixture<ProduceAddAppendixDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceAddAppendixDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceAddAppendixDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
