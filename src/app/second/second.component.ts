import { Component, OnInit } from '@angular/core';
import olVectorLayer from "ol/layer/Vector";
import Style from 'ol/style/Style';
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
// import { proj } from 'src/assets/projects';
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {

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
            <td font-style="italic">215</td>
          </tr>
          <tr>
            <td><b>province </b></td>
            <td>Laarache</td>
          </tr>
          <tr>
            <td><b>commune</b></td>
            <td>Laarache</td>
          </tr>
          <tr>
            <td><b>secteur</b></td>
            <td>risque naturel</td>
          </tr>
          <tr>
            <td><b>Objet</b></td>
            <td>prévention contre les innondation</td>
          </tr>
          <tr ="2">
            <td><b>type de projet</b></td>
            <td>Type A</td>
          </tr>
        </table>
        `
        
      
      
      this.content.innerHTML = vv
      this.overlay.setPosition(evt.coordinate)
      // toto
    
    })
   })

    // this.mapPrevLine.addLayer(this.polygonLayer)
    //    this.polygonSrc.on('addfeature', () =>{
    //     this.mapPrevLine.getView().fit(
    //         this.polygonSrc.getExtent(),
    //         { duration: 2000, size: this.mapPrevLine.getSize(), maxZoom: 24 }
    //     );
    //   });
    this.mapPrevLine.addLayer(this.pointLayer )
       this.pointSrc.on('addfeature', () =>{
        this.mapPrevLine.getView().fit(
            this.pointSrc.getExtent(),
            { duration: 2000, size: this.mapPrevLine.getSize(), maxZoom: 8 }
        );
      });

      // this.polygonSrc.addFeatures(
      //   this.format.readFeatures(geo)
      // );
      this.pointSrc.addFeatures(
        this.format.readFeatures( this.retrurnProj())
      );


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
}
