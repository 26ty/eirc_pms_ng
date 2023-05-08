import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTodayListComponent } from './person-today-list.component';

describe('PersonTodayListComponent', () => {
  let component: PersonTodayListComponent;
  let fixture: ComponentFixture<PersonTodayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTodayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTodayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
