import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalContactListComponent } from './internal-contact-list.component';

describe('InternalContactListComponent', () => {
  let component: InternalContactListComponent;
  let fixture: ComponentFixture<InternalContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalContactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
