import { Component, OnInit, ViewChild } from '@angular/core';
import olVectorLayer from "ol/layer/Vector";
import {Style,Text} from "ol/style";
import Stroke from 'ol/style/Stroke';
import Map from "ol/Map";
import FullScreen from 'ol/control/FullScreen';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import { Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import GeoJSON from "ol/format/GeoJSON";
// import { geo } from 'src/assets/communes';
import CircleStyle from "ol/style/Circle";
import { ServiceService } from '../service.service';
import Control from 'ol/control/Control';
import * as moment from "moment";
import { compareAsc, format } from 'date-fns'
import {FormControl} from '@angular/forms';
import 'anychart'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";
import { remove } from 'ol/array';
import { JsonpClientBackend } from '@angular/common/http';
import { LineStyle } from '../models/LineStyle';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

// import { proj } from 'src/assets/projects';
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = [''];

  title = 'dashboardApp';
  mapPrevLine: any;
  polygonSrc: any;
  polygonLayer: any;
  format = new GeoJSON(); 
  container: any;
  content: any ;
  closer: any;
  overlay: any;
  pointSrc: any;
  point_radius = 8
  point_fill = '#B9E0FF'
  point_strock= '#6C4AB6'
  pointLayer: any;
  lineSrc: any;
  lineLayer: any;
  phases: any;
  ressores: any;
  colorsd: any;
  strok: any;
  polyFil:any;
  polycolor:any;
  poly_width:any;
  polygonSrc1: any;
  polygonLayer1: any;
  polyFilF(eve:any){
    console.log(eve.target.value)
    this.polyFil = eve.target.value;
  }
  polycolorF(eve:any){
    console.log(eve.target.value)
    this.polycolor = eve.target.value;
  }
  poly_widthF(eve:any){
    console.log(eve.target.value)
    this.poly_width = eve.target.value;
  }

  lines = new LineStyle(
    "Normal",
    "center",
    "middle",
    "0",
    "Arial",
    "Bold",
    "Point",
    "0.7853981633974483",
    true,
    "12px",
    "10",
    "3px",
    "4px",
    "black",
    "white",
    "4",
    "38400"
  );
  verificationClick_section: boolean = false;
  splitClick_section: boolean = false;
  editClick_section: any = false;
  edit1!: HTMLButtonElement;
  id: any;
  date_depart: any;
  name: any;
  delais: any;
  avancement: any;
  objet: any;
  style: any;
  public chartOptions: any;
  addtaskClick_section: boolean = false;
  date_arrive: any;
  version: any;
  phase: any;
  pertClick_section: boolean = false;
  taskss: any;
  pred: any;
  preed: any;
  nothere: boolean = false;
  chart:any
  sortedProducts!: any[];
  constructor(private service:ServiceService) { 
    this.tasks()
    this.chartOptions = {
      series: [
        {
          name: "Bob",
          data: [
            {
              x: "Design",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-08").getTime()
              ]
            },
            {
              x: "Code",
              y: [
                new Date("2019-03-08").getTime(),
                new Date("2019-03-11").getTime()
              ]
            },
            {
              x: "Test",
              y: [
                new Date("2019-03-11").getTime(),
                new Date("2019-03-16").getTime()
              ]
            }
          ]
        },
        {
          name: "Joe",
          data: [
            {
              x: "Design",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-05").getTime()
              ]
            },
            {
              x: "Code",
              y: [
                new Date("2019-03-06").getTime(),
                new Date("2019-03-09").getTime()
              ]
            },
            {
              x: "Test",
              y: [
                new Date("2019-03-10").getTime(),
                new Date("2019-03-19").getTime()
              ]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val:any) {
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, "days");
          return diff + (diff > 1 ? " days" : " day");
        }
      },
      xaxis: {
        type: "datetime"
      },
      legend: {
        position: "top"
      }
    };
  }

  get_phases() {
    this.service.get_phases().subscribe(
      (res)=>{
        this.phases = res
      for(let i of res){
        console.log(i)

        this.lineSrc.addFeatures(
          this.format.readFeatures({
            "type": "Feature",
            "properties": {id:i.id,style:i.style,name:i.name,avancement:i.avancement,date_depart:i.date_depart,objet:i.objet,delais:i.delais},
            "geometry": JSON.parse(<string>i.geom)
          },{dataProjection:"EPSG:4326"})
        );

        this.polygonSrc1.addFeatures(
          this.format.readFeatures({
            "type": "Feature",
            "properties": {id:i.id,style:i.style,name:i.name,avancement:i.avancement,date_depart:i.date_depart,objet:i.objet,delais:i.delais},
            "geometry": JSON.parse(<string>i.geomavancement)
          },{dataProjection:"EPSG:4326"})
        );
      }
      },err=>console.error(err));

  }

  ngOnInit(): void {


this.polygonSrc1 = new VectorSource();

  this.polygonLayer1 = new olVectorLayer({

    source: this.polygonSrc1,

    style: (feature, resolution) =>new Style({

      stroke: new Stroke({
        color: "black",
        width: 2,
      }),
      fill: new Fill({
        color: "orange",
      }),
      text: new Text({
        textAlign:  'center',
      textBaseline: <string>this.lines.baseline,
      font: <string>this.lines.font,
      text: 'avancement:' + ((+feature.get("avancement"))*100 +'%'),
      fill: new Fill({ color: "black" }),
      stroke: new Stroke({ color: "white", width: 3 }),
      offsetX: 0,
      offsetY: -15,
      placement: "point",
      maxAngle: 45,
      overflow: this.lines.overflow,
      rotation: <any>this.lines.rotation,

      
      })
    }) ,
  });

    this.lineSrc = new VectorSource();

    this.lineLayer = new olVectorLayer({
  
      source: this.lineSrc,
  
      style: (feature,resolution)=> {
        console.error(feature.get("name"))
        var object = JSON.parse(feature.getProperties()["style"]);
        if(0.0002362464157453313>resolution && resolution >0.00008575184020914552){
          this.ressores = 4;
          this.colorsd = object.remplissageC
          
        }
        if(0.0002162464157453313<resolution){
          this.ressores = 5
          this.colorsd = object.remplissageC
         
        }
        if(0.0002362464157453313>resolution){
          this.colorsd = object.colorBor
          this.ressores = object.strock
          
        }
        
        return new Style({
        
        stroke: new Stroke({
          color: this.colorsd,
          width: this.ressores,
        }),
        fill: new Fill({
          color: object.remplissageC,
        }),
        text: new Text({
          textAlign:  'center',
        textBaseline: <string>this.lines.baseline,
        font: <string>this.lines.font,
        text: feature.get("name"),
        fill: new Fill({ color: "black" }),
        stroke: new Stroke({ color: "white", width: 3 }),
        offsetX: 0,
        offsetY: -15,
        placement: "point",
        maxAngle: 45,
        overflow: this.lines.overflow,
        rotation: <any>this.lines.rotation,
  
        
        })
      })}
    });
    this.get_phases();

  this.pointSrc = new VectorSource();

  this.pointLayer = new olVectorLayer({

    source: this.pointSrc,

    style: (feature,resolution)=> new Style({
      image: new CircleStyle({
        radius: this.point_radius,
        fill: new Fill({color: this.point_fill}),
        stroke: new Stroke({color: this.point_strock, width: 3}),
      }),
      
    })
  });

    this.polygonSrc = new VectorSource();

    this.polygonLayer = new olVectorLayer({

    source:  this.polygonSrc,

    style: new Style({
      stroke: new Stroke({
        color: 'black',
        width: 2,
        lineDash:[3,5]
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.1)',
      }),
    }) ,
  });

    this.container = <HTMLElement>document.getElementById("popup");
    this.content = <HTMLElement>document.getElementById("popup-content");
    this.closer = <HTMLElement> document.getElementById("popup-closer");
    this.overlay = new Overlay({
      element: this.container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.closer.onclick =  ()=> {
      this.overlay.setPosition(undefined);
      if(this.closer)this.closer.blur();
      return false;
    };


  
    this.mapPrevLine = new Map({
      target: "mapPrev",
      layers: [  new TileLayer({
        source: new XYZ({
          url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
        })
      }) ],
      controls: [
       new FullScreen(),
       new Zoom(),
       new ScaleLine({ bar: true })
     ],
      view: new View({
       center: [
         -6, 35
       ],
        zoom: 5,
        projection: "EPSG:4326",
      }),
    });

    this.mapPrevLine.addOverlay(this.overlay);


    this.mapPrevLine.on('click',(evt: any) => {

      if(this.pertClick_section){
        this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature:any, Layer:any) => {
          var object = feature.getProperties();
          console.log(object)

          this.edit1 = document.createElement("button");
          this.edit1.setAttribute("data-bs-toggle", "modal");
          this.edit1.setAttribute("data-bs-target", "#pert");
          this.edit1.setAttribute("id", "voleeedf");
          this.edit1.style.visibility = "hidden";
          document.body.appendChild(this.edit1);
          this.phase = object.id
          this.edit1.click();
          this.pertClick_section = false;
          pert.classList.toggle('clicked');

        })

      }
      if(this.addtaskClick_section){
        this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature:any, Layer:any) => {
          var object = feature.getProperties();
          console.log(object)

          this.edit1 = document.createElement("button");
          this.edit1.setAttribute("data-bs-toggle", "modal");
          this.edit1.setAttribute("data-bs-target", "#addtask");
          this.edit1.setAttribute("id", "voleeedf");
          this.edit1.style.visibility = "hidden";
          document.body.appendChild(this.edit1);
          this.phase = object.id
          this.edit1.click();
          this.addtaskClick_section = false;
          addtask.classList.toggle('clicked');

        })

      }

      this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature:any, Layer:any) => {
        var object = feature.getProperties();
          console.log(object)

        this.gant(object.id)
      })


      
      if(this.editClick_section){
        this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature:any, Layer:any) => {
          var object = feature.getProperties();
          console.log(object)
          this.id = object.id;
          this.date_depart = object.date_depart;
          this.name = object.name;
          this.delais= object.delais;
          this.avancement= object.avancement;
          this.objet= object.objet;
          this.style= object.style;
          this.polyFil = JSON.parse(this.style).remplissageC
          this.polycolor = JSON.parse(this.style).colorBor
          this.poly_width = JSON.parse(this.style).strock
         

        this.edit1 = document.createElement("button");
        this.edit1.setAttribute("data-bs-toggle", "modal");
        this.edit1.setAttribute("data-bs-target", "#EditModel");
        this.edit1.setAttribute("id", "voleeedf");
        this.edit1.style.visibility = "hidden";
        document.body.appendChild(this.edit1);

        this.edit1.click();
        })
      }
      if(this.splitClick_section){
        this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature:any, Layer:any) => {
          var object = feature.getProperties();
        console.log(object)
        var data = {
          id:object.id,
          pourcent:0.5
        }
        this.service.spliteF(data).subscribe(res=>{console.log(res); this.lineSrc.clear();this.get_phases();},(err:any)=>console.log(err))
      })
      }
     
      
      if(this.verificationClick_section){
    this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature:any, Layer:any) => {
      var object = feature.getProperties();
      console.log(object)
     var vv
     
          vv =  `<table id="customers" class="table-style">
          <thead>
            <tr>
              <th colspan="2"><b>OUVRAGE D ART </b></th>
            </tr>
          </thead>
          <tr>
            <td colspan="2"><img  src="https://www.construction21.org/france/data/sources/users/19209/20220713082447-inondation-narbonne-pleiades.jpg" width="100%" height="100px" /></td>
          </tr>
          <tr>
            <td><b>id </b></td>
            <td font-style="italic">${object.id}</td>
          </tr>
          <tr>
            <td><b>name </b></td>
            <td>${object.name}</td>
          </tr>
          <tr>
            <td><b>delais</b></td>
            <td>${object.delais}</td>
          </tr>
          <tr>
            <td><b>objet</b></td>
            <td>${object.objet}</td>
          </tr>
          <tr>
            <td><b>date_depart</b></td>
            <td>${object.date_depart}</td>
          </tr>
          <tr ="2">
            <td><b>avancement de projet</b></td>
            <td>${object.avancement}</td>
          </tr>
        </table>
        `
        
      
      
      this.content.innerHTML = vv
      
        this.overlay.setPosition(evt.coordinate)
      
      
      // toto
    
    })
  }
   })

    this.mapPrevLine.addLayer(this.pointLayer )
    this.mapPrevLine.addLayer(this.lineLayer )
    this.mapPrevLine.addLayer(this.polygonLayer1 )
       this.pointSrc.on('addfeature', () =>{
        this.mapPrevLine.getView().fit(
            this.pointSrc.getExtent(),
            { duration: 2000, size: this.mapPrevLine.getSize(), maxZoom: 8 }
        );
      });

     
      this.pointSrc.addFeatures(
        this.format.readFeatures( this.retrurnProj())
      );



// control
      var pop = document.createElement('button');
      pop.innerHTML = '<i class="bi bi-app-indicator"></i>';
      pop.className = 'myButton_section';
      pop.id = 'myButton_section';

      var localisationElement_section = document.createElement('div');
      localisationElement_section.className = 'localisationDiv_section';
      localisationElement_section.appendChild(pop);

        var control3 = new Control({
      element: localisationElement_section
    })

    this.mapPrevLine.addControl(control3);
    pop.addEventListener("click",()=>{
      pop.classList.toggle('clicked');
      this.verificationClick_section = this.verificationClick_section?false:true;
     })
// control2
      var split = document.createElement('button');
      split.innerHTML = '<i class="bi bi-layout-split"></i>';
      split.className = 'myButton_split';
      split.id = 'myButton_split';

      var localisationElement_section = document.createElement('div');
      localisationElement_section.className = 'localisationDiv_split';
      localisationElement_section.appendChild(split);

        var control1 = new Control({
      element: localisationElement_section
    })

    this.mapPrevLine.addControl(control1);
    split.addEventListener("click",()=>{
      split.classList.toggle('clicked');
      this.splitClick_section = this.splitClick_section?false:true;
     })

// control2
      var edit = document.createElement('button');
      edit.innerHTML = '<i class="bi bi-pencil-square"></i>';
      edit.className = 'myButton_edit';
      edit.id = 'myButton_edit';

      var edit_section = document.createElement('div');
      edit_section.className = 'localisationDiv_edit';
      edit_section.appendChild(edit);

        var control4 = new Control({
      element: edit_section
    })

    this.mapPrevLine.addControl(control4);

    edit.addEventListener("click",()=>{
      edit.classList.toggle('clicked');
      this.editClick_section = this.editClick_section?false:true;
     })

// control2
      var addtask = document.createElement('button');
      addtask.innerHTML = '<i class="bi bi-list-task"></i>';
      addtask.className = 'myButton_addtask';
      addtask.id = 'myButton_addtask';

      var addtask_section = document.createElement('div');
      addtask_section.className = 'localisationDiv_addtask';
      addtask_section.appendChild(addtask);

        var control45 = new Control({
      element: addtask_section
    })

    this.mapPrevLine.addControl(control45);

    addtask.addEventListener("click",()=>{
      addtask.classList.toggle('clicked');
      this.addtaskClick_section = this.addtaskClick_section?false:true;
     })


// control2
      var pert = document.createElement('button');
      pert.innerHTML = '<i class="bi bi-diagram-3"></i>';
      pert.className = 'myButton_pert';
      pert.id = 'myButton_pert';

      var pert_section = document.createElement('div');
      pert_section.className = 'localisationDiv_pert';
      pert_section.appendChild(pert);

        var control452 = new Control({
      element: pert_section
    })

    this.mapPrevLine.addControl(control452);

    pert.addEventListener("click",()=>{
      pert.classList.toggle('clicked');
      this.pertClick_section = this.pertClick_section?false:true;
     })


    
  }



  retrurnProj(){
    return {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.832048089984056,
              34.01802146986468
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.856139495451686,
              34.00612025112163
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.853462672621561,
              33.9534524798579
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.7157279706563315,
              33.97504819461591
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.7390893335337125,
              34.05633609006732
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.052824112435189,
              34.08577288615707
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.177876310068939,
              33.82263769538561
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.237643904527204,
              33.69114786848844
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.19785307532311,
              33.53346360445664
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.0222282977634904,
              33.41151019626622
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -4.75435221265144,
              32.8341998607639
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -4.421171962881829,
              33.85388860624755
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -4.242466192550808,
              33.339210973888484
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -4.663484871805508,
              34.28794068831799
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -5.775095341491863,
              34.48291171163558
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.2793433999392505,
              34.73289509945775
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -6.2005917045391925,
              34.755294962156384
            ],
            "type": "Point"
          }
        }
      ]
    }
  }



  nameF(vll:any){
    // console.log(vll.target.value);
    this.name = vll.target.value;
  }
  datedepF(vll:any){
    // console.log(vll.target.value);
    this.date_depart = vll.target.value;
  }
  delaisF(vll:any){
    // console.log(vll.target.value);
    this.delais = vll.target.value;
  }
  avancementF(vll:any){
    // console.log(vll.target.value);
    this.avancement = vll.target.value;
  }
  objetF(vll:any){
    // console.log(vll.target.value);
    this.objet = vll.target.value;
  }
  date_departF(vll:any){
    // console.log(vll.target.value);
    this.date_depart = vll.target.value;
  }
  date_arriveF(vll:any){
    // console.log(vll.target.value);
    this.date_arrive = vll.target.value;
  }
  versionF(vll:any){
    this.toppingList = []
     console.log(vll.target.value);
    this.version = vll.target.value;
    
      console.log(this.taskss)
      for(let d of this.taskss){
     if(d.phase.id == this.phase){
      if(d.version == this.version){
        this.toppingList.push(d.name)
     }
     }
        
    }
}
  phaseF(vll:any){
    // console.log(vll.target.value);
    this.phase = vll.target.value;
  }

  saveme(){
    // console.log(vll.target.value);
    var obj = {
          id:this.id,
          name:this.name,
          style:JSON.stringify({
            remplissageC:this.polyFil,
            colorBor:this.polycolor,
            strock: this.poly_width
          }),
          avancement:this.avancement,
          dateDepart:this.date_depart,
          objet:this.objet,
          delais:this.delais,
      
       
    }

    this.service.updatephase(obj).subscribe(res=>{
      console.log(res);this.lineSrc.clear();this.get_phases(); 
    },err=>console.log(err))
  }

  savemee(){
    // console.log(vll.target.value);

this.preed= []
    for(let i of this.pred){
      this.preed.push(<string>(this.getpredid(i)))
    }

    var obj = {
          date_depart:this.date_depart,
          date_arrive:this.date_arrive ,
          version:this.version,
          avancement:this.avancement,
          phase:this.phase,
          name:this.name,
          pred: this.preed
    }
    console.log(obj)

    this.service.addtask(obj).subscribe(res=>{
      console.log(res); this.gant(this.phase)
    },err=>console.log(err))
  }

  getpredid(pred:any){
    for(let d of this.taskss){
      if(d.phase.id == this.phase){
       if(d.version == this.version){
        if(pred == d.name)
         return d.id;
      }
      }
    }
  }

  gant(id:any){
    this.service.getGantt(id).subscribe(
      res=>{
        console.log(res)
        var data1 = []
        var data = []
        var element :any
        var dataelement :any
        console.log(res)
        for(let i of res){
           element  = {}
           element.name = i.name;
           data = []
          for(let j of i.data){
            dataelement ={
              x:j.x,
              y:[]
            }

            for(let k of j.y){
              // k = format(new Date(k), 'yyyy-MM-dd')
              dataelement.y.push(new Date(k).getTime())
            }
            data.push(dataelement)
          }
          element.data = data
          data1.push(element)
        }
        console.log(data1)
        this.chartOptions.series = <ApexAxisChartSeries> <unknown>data1
        this.chartOptions.series =[...this.chartOptions.series]
      // pert



      anychart.onDocumentReady( ()=> {
        
        // set the data with strict durations
        var data112 = []
        for(let i of res){
          for(let j of i.data){
            console.error(j)
          var obj:any = {
            id:j.id,
            duration:Math.trunc(Math.abs((new Date(j.y[0]).getTime()-new Date(j.y[1]).getTime())/(1000 * 3600 * 24))),
            name:j.x
          }
          if(j.pedecessors.length>0){
            obj['dependsOn'] = j.pedecessors
          }
          data112.push(obj)
        }

        }

        console.log(data112)

        this.sortedProducts = data112.sort(
          (p1, p2) => (+p1.id > +p2.id) ? 1 : (+p1.id < +p2.id) ? -1 : 0);
          console.log(this.sortedProducts)
    


          
        // create a chart
        if(!this.nothere){
          this.chart = anychart.pert();
          // set the data
          this.chart.data(this.sortedProducts, "as-table");
          // set chart title
          this.chart.title("Nodes and Connections Set Simultaneously");
          // display the chart
          // set vertical spacing between tasks
          this.chart.horizontalSpacing("25%");
  
          var tasks = this.chart.tasks();
          console.log(tasks)
          // set labels with earliest and latest values
          tasks.upperLabels().format("ES: {%earliestStart}, LS: {%latestStart}");
          tasks.lowerLabels().format("EF: {%earliestFinish}, LF: {%latestFinish}");
      
   
          this.chart.container("container");
          this.chart.draw();
          this.nothere = true
        }else{
          this.chart.dispose()

          this.chart = anychart.pert();
          // set the data
          this.chart.data(this.sortedProducts, "as-table");
          // set chart title
          this.chart.title("Nodes and Connections Set Simultaneously");
          // display the chart
          // set vertical spacing between tasks
          this.chart.horizontalSpacing("25%");
  
          var tasks = this.chart.tasks();
          console.log(tasks)
          // set labels with earliest and latest values
          tasks.upperLabels().format("ES: {%earliestStart}, LS: {%latestStart}");
          tasks.lowerLabels().format("EF: {%earliestFinish}, LF: {%latestFinish}");
      
   
          this.chart.container("container");
          this.chart.draw();
          this.nothere = true
          
        }
        
       
       
       
        
    });

      }
      
      
      ,(err:any)=>console.log(err))
  }


  tasks(){
    this.service.alltasks().subscribe(res=>{console.log(res); this.taskss =res },err=>console.log(err))
  }
  changing(){
    console.log(this.toppings.value)
    this.pred = this.toppings.value
  }



  createTextStyle(feature:any, resolution:any, dom:any, type:any) {
   console.warn(feature.get("name"))
    if (feature) {
      const align = dom?.align;
      const baseline = dom?.baseline;
      const size = dom.size;
      const height = dom?.height;
      const offsetX = parseInt(dom?.offsetX, 10);
      const offsetY = parseInt(dom?.offsetY, 10);
      const weight = dom?.weight;
      const placement = dom?.placement ? dom?.placement : undefined;
      const maxAngle = dom?.maxangle ? parseFloat(dom?.maxangle) : undefined;
      const overflow = dom?.overflow ? dom?.overflow == "true" : undefined;
      const rotation = parseFloat(dom?.rotation);
      if (dom?.font == "'Open Sans'") {
        const openSans = document.createElement("link");
        openSans.href = "https://fonts.googleapis.com/css?family=Open+Sans";
        openSans.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(openSans);
        
      }
      const font = weight + " " + size + "/" + height + " " + dom?.font;
      const fillColor = dom?.color;
      const outlineColor = dom?.outline;
      const outlineWidth = parseInt(dom?.outlineWidth, 10);
      return new Text({
        textAlign: align == "" ? undefined : align,
        textBaseline: baseline,
        font: font,
        text: String(feature.get("name")),
        fill: new Fill({ color: fillColor }),
        stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
        offsetX: offsetX,
        offsetY: offsetY,
        placement: placement,
        maxAngle: maxAngle,
        overflow: overflow,
        rotation: rotation,
      });
    }
    return new Text()
  }


  
  


}

