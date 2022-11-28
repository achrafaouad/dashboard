import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-gauge1',
  templateUrl: './gauge1.component.html',
  styleUrls: ['./gauge1.component.css']
})
export class Gauge1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var dom = <HTMLElement>document.getElementById('gauge1');
var myChart = echarts.init(dom, undefined, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  series: [
    {
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'black'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: 'grey',
          width: 1
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      axisLabel: {
        color: 'auto',
        distance: 30,
        fontSize: 8
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
        color: 'auto',
        fontSize: 8
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
};
setInterval(function () {
  myChart.setOption({
    series: [
      {
        data: [
          {
            value: +(Math.random() * 100).toFixed(2)
          }
        ]
      }
    ]
  });
}, 100);

if (option && typeof option === 'object') {
  myChart.setOption(option);
}
  }

}
