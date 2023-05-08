import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborhourReturnComponent } from './laborhour-return.component';

describe('LaborhourReturnComponent', () => {
  let component: LaborhourReturnComponent;
  let fixture: ComponentFixture<LaborhourReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborhourReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborhourReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
