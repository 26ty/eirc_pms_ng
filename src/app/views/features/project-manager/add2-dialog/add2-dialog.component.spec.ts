import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Add2DialogComponent } from './add2-dialog.component';

describe('Add2DialogComponent', () => {
  let component: Add2DialogComponent;
  let fixture: ComponentFixture<Add2DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Add2DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Add2DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
