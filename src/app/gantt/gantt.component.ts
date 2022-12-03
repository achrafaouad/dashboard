import { Component, OnInit } from '@angular/core';
import { ServiceService, Task, Dependency, Resource, ResourceAssignment } from '../service.service';
import 'anychart'
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
  providers: [ServiceService],
  preserveWhitespaces: true
})

export class GanttComponent implements OnInit {
  tasks!: Task[];
  dependencies!: Dependency[];
  resources!: Resource[];
  resourceAssignments!: ResourceAssignment[];
  dd:number = 500
 
  constructor(service: ServiceService) { 
        this.tasks = service.getTasks();
        this.dependencies = service.getDependencies();
        this.resources = service.getResources();
        this.resourceAssignments = service.getResourceAssignments();
  }

  ngOnInit(): void {

    anychart.onDocumentReady(function () {
      // set the data with strict durations
      var data = [
  {id: "1", duration: 1, name: "A"},
  {id: "3", duration: 3, name: "A"},
  {id: "2", duration: 3, name: "B"},
  {id: "3", duration: 2, name: "D"},
  {id: "4", duration: 2, name: "AD"},
  {id: "5", duration: 2, name: "BC", dependsOn: ["2"]}
      ];
      // create a chart
      var chart = anychart.pert();
      // set the data
      chart.data(data, "as-table");
      // set chart title
      chart.title("Nodes and Connections Set Simultaneously");
      // display the chart
      chart.container("container");
      chart.draw();
  });
  
  }

}
