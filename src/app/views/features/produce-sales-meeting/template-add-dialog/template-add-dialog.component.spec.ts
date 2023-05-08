import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddDialogComponent } from './template-add-dialog.component';

describe('TemplateAddDialogComponent', () => {
  let component: TemplateAddDialogComponent;
  let fixture: ComponentFixture<TemplateAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
