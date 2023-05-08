import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborhourReturnEditComponent } from './laborhour-return-edit.component';

describe('LaborhourReturnEditComponent', () => {
  let component: LaborhourReturnEditComponent;
  let fixture: ComponentFixture<LaborhourReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborhourReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborhourReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
