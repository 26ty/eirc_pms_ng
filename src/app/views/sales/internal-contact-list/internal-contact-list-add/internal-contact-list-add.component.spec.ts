import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalContactListAddComponent } from './internal-contact-list-add.component';

describe('InternalContactListAddComponent', () => {
  let component: InternalContactListAddComponent;
  let fixture: ComponentFixture<InternalContactListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalContactListAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalContactListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
