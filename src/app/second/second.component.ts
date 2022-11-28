import { Component, OnInit } from '@angular/core';
import olVectorLayer from "ol/layer/Vector";
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { ColorLike } from 'ol/colorlike';
import LayerTile from "ol/layer/Tile";
import OSM from 'ol/source/OSM';
import Map from "ol/Map";
import FullScreen from 'ol/control/FullScreen';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import GeoJSON from "ol/format/GeoJSON";
import { geo } from 'src/assets/communes';

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
  constructor() { }

  ngOnInit(): void {

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

    this.mapPrevLine.addLayer(this.polygonLayer)
       this.polygonSrc.on('addfeature', () =>{
        this.mapPrevLine.getView().fit(
            this.polygonSrc.getExtent(),
            { duration: 2000, size: this.mapPrevLine.getSize(), maxZoom: 24 }
        );
      });

      this.polygonSrc.addFeatures(
        this.format.readFeatures(geo)
      );


  }
}
