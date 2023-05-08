import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceAddDialogComponent } from './produce-add-dialog.component';

describe('ProduceAddDialogComponent', () => {
  let component: ProduceAddDialogComponent;
  let fixture: ComponentFixture<ProduceAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
