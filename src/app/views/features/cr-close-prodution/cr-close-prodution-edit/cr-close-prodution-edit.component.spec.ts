import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseProdutionEditComponent } from './cr-close-prodution-edit.component';

describe('CrCloseProdutionEditComponent', () => {
  let component: CrCloseProdutionEditComponent;
  let fixture: ComponentFixture<CrCloseProdutionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseProdutionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseProdutionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
