import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as echarts from 'echarts';
@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnInit {
  style: any;

  constructor() { }

  ngOnInit(): void {
    var svg = d3.select("svg"),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

d3.json("../assets/data/flare.json", (error:any, root:any) => {
  if (error) throw error;

  root = d3.hierarchy(root)
      .sum((d:any)=>  d.size )
      .sort((a:any, b:any)=> { return b.value - a.value; });

  var focus = root,
      nodes = pack(root).descendants();
     var view:any;

  var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", (d:any)=> { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", (d:any)=> { return d.children ? color(d.depth) : null; })
      .on("click", (d:any)=> { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", (d:any)=> { return d.parent === root ? 1 : 0; })
      .style("display", (d:any)=> { return d.parent === root ? "inline" : "none"; })
      .text((d:any)=> { return d.data.name; });

  var node = g.selectAll("circle,text");

  svg
      .style("background", color(-1))
      .on("click", ()=> { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  const zoom = (d:any) => {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", (d:any)=> {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return (t:any)=> { zoomTo(i(t)); };
        });
        transition.selectAll("text")
        .filter((d:any)=> {console.log(d.parent); return d.parent === focus  })
          .style("fill-opacity", (d:any) =>{ return d.parent === focus ? 1 : 0; })
          .style("display",(d:any) => {if (d.parent === focus) return "inline"; else if(d.parent != focus) return "none"; else return "none" })   
  }

  function zoomTo(v:any) {
    
    var k = diameter / v[2]; view = v;
    node.attr("transform", (d:any)=> { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", (d:any)=> { return d.r * k; });
  }
});
  }

}
