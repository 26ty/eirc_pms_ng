import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftApplicationListComponent } from './gift-application-list.component';

describe('GiftApplicationListComponent', () => {
  let component: GiftApplicationListComponent;
  let fixture: ComponentFixture<GiftApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftApplicationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
