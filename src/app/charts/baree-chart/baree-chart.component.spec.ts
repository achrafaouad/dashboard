import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BareeChartComponent } from './baree-chart.component';

describe('BareeChartComponent', () => {
  let component: BareeChartComponent;
  let fixture: ComponentFixture<BareeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BareeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BareeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
