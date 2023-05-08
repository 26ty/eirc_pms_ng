import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceEditDialogComponent } from './produce-edit-dialog.component';

describe('ProduceEditDialogComponent', () => {
  let component: ProduceEditDialogComponent;
  let fixture: ComponentFixture<ProduceEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
