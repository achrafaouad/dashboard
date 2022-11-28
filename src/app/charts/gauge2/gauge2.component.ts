import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-gauge2',
  templateUrl: './gauge2.component.html',
  styleUrls: ['./gauge2.component.css']
})
export class Gauge2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var dom = <HTMLElement>document.getElementById('gauge2');
    var myChart = echarts.init(dom, undefined, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

const gaugeData = [
  {
    value: 20,
    name: 'Good',
    title: {
      offsetCenter: ['-40%', '80%']
    },
    detail: {
      offsetCenter: ['-40%', '95%']
    }
  },
  {
    value: 40,
    name: 'Better',
    title: {
      offsetCenter: ['0%', '80%']
    },
    detail: {
      offsetCenter: ['0%', '95%']
    }
  },
  {
    value: 60,
    name: 'Perfect',
    title: {
      offsetCenter: ['40%', '80%']
    },
    detail: {
      offsetCenter: ['40%', '95%']
    }
  }
];
option = {
  series: [
    {
      type: 'gauge',
      anchor: {
        show: true,
        showAbove: true,
        size: 3,
        itemStyle: {
          color: 'green'
        }
      },
      pointer: {
        icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
        width: 3,
        length: '80%',
        offsetCenter: [0, '7%']
      },
      progress: {
        show: true,
        overlap: true,
        roundCap: true
      },
      axisLine: {
        roundCap: true
      },
      data: gaugeData,
      title: {
        fontSize: 8
      },
      detail: {
        width: 10,
        height: 7,
        fontSize: 8,
        color: '#fff',
        backgroundColor: 'auto',
        borderRadius: 3,
        formatter: '{value}%'
      }
    }
  ]
};
setInterval(function () {
  gaugeData[0].value = +(Math.random() * 100).toFixed(2);
  gaugeData[1].value = +(Math.random() * 100).toFixed(2);
  gaugeData[2].value = +(Math.random() * 100).toFixed(2);
  myChart.setOption({
    series: [
      {
        data: gaugeData
      }
    ]
  });
}, 100);

if (option && typeof option === 'object') {
  myChart.setOption(option);
}
  }

}
