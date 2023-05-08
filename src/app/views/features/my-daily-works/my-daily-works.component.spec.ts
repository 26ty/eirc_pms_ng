import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDailyWorksComponent } from './my-daily-works.component';

describe('MyDailyWorksComponent', () => {
  let component: MyDailyWorksComponent;
  let fixture: ComponentFixture<MyDailyWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDailyWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDailyWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
