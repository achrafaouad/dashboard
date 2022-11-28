import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-baree-chart',
  templateUrl: './baree-chart.component.html',
  styleUrls: ['./baree-chart.component.css']
})
export class BareeChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var dom = <HTMLElement>document.getElementById('chart-containerbaree');
var myChart = echarts.init(dom, undefined, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [1.3, 59, 'Matcha Latte'],
      [57.1, 23, 'Milk Tea'],
      [74.4, 22, 'Cheese Cocoa'],
      [50.1, 41, 'Cheese Brownie'],
      [89.7, 51, 'Matcha Cocoa'],
      [68.1, 61, 'Tea'],
      [19.6, 55, 'Orange Juice'],
      [10.6, 12, 'Lemon Juice'],
      [32.7, 100, 'Walnut Brownie']
    ]
  },
  grid: { containLabel: true },
  xAxis: { name: 'A' },
  yAxis: { type: 'category' },
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    min: 10,
    max: 50,
    text: ['High Score', 'Low Score'],
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ['#3FA796', '#FEC260', '#A10035']
    }
  },
  series: [
    {
      type: 'bar',
      encode: {
        // Map the "amount" column to X axis.
        x: 'amount',
        // Map the "product" column to Y axis
        y: 'product'
      }
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}
  }

}
