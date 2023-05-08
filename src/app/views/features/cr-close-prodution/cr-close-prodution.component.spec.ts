import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrCloseProdutionComponent } from './cr-close-prodution.component';

describe('CrCloseProdutionComponent', () => {
  let component: CrCloseProdutionComponent;
  let fixture: ComponentFixture<CrCloseProdutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrCloseProdutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrCloseProdutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
