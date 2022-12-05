import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var dom = <HTMLElement>document.getElementById('graphs');
    var myChart = echarts.init(dom, undefined, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  title: {
    // text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['prevue', 'reel']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['01', '02', '03', '04', '05', '06', '07']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'prevue',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
      
    },
    {
      name: 'reel',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 320]
    }
    
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

// window.addEventListener('resize', myChart.resize);
  }

}
