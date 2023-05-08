import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalprojectAddDialogComponent } from './formalproject-add-dialog.component';

describe('FormalprojectAddDialogComponent', () => {
  let component: FormalprojectAddDialogComponent;
  let fixture: ComponentFixture<FormalprojectAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormalprojectAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalprojectAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
