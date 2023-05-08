import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRecordBookComponent } from './project-record-book.component';

describe('ProjectRecordBookComponent', () => {
  let component: ProjectRecordBookComponent;
  let fixture: ComponentFixture<ProjectRecordBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRecordBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRecordBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
