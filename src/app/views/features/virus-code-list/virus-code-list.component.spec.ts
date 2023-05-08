import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirusCodeListComponent } from './virus-code-list.component';

describe('VirusCodeListComponent', () => {
  let component: VirusCodeListComponent;
  let fixture: ComponentFixture<VirusCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirusCodeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirusCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
