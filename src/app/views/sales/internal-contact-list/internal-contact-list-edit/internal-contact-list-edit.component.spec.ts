import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalContactListEditComponent } from './internal-contact-list-edit.component';

describe('InternalContactListEditComponent', () => {
  let component: InternalContactListEditComponent;
  let fixture: ComponentFixture<InternalContactListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalContactListEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalContactListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
