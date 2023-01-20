import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvreadComponent } from './csvread.component';

describe('CsvreadComponent', () => {
  let component: CsvreadComponent;
  let fixture: ComponentFixture<CsvreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
