import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { StackedChartComponent } from './charts/stacked-chart/stacked-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { BareeChartComponent } from './charts/baree-chart/baree-chart.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import { Gauge1Component } from './charts/gauge1/gauge1.component';
import { Gauge2Component } from './charts/gauge2/gauge2.component';
import { DoughnutComponent } from './charts/doughnut/doughnut.component';
import { WeatherchartComponent } from './charts/weatherchart/weatherchart.component';
import { ThirdComponent } from './third/third.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    StackedChartComponent,
    PieChartComponent,
    BarChartComponent,
    BareeChartComponent,
    SecondComponent,
    FirstComponent,
    Gauge1Component,
    Gauge2Component,
    DoughnutComponent,
    WeatherchartComponent,
    ThirdComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
