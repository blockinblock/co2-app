import { Component, AfterViewInit } from '@angular/core';

import { defaults as defaultControls } from 'ol/control';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: Map = null;
  private mapId = 'MyMap';

  constructor() {  }

  ngAfterViewInit() {
    // https://stackoverflow.com/questions/48283679/use-openlayers-4-with-angular-5

    this.map = new Map({
      target: this.mapId,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([13.4050, 52.5200]),
        zoom: 11
      }),
      // TODO: sort out the coordinates!
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])
    });
  }
}
