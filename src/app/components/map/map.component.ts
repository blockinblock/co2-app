import { Component, AfterViewInit, ViewChild } from '@angular/core';

// OpenLayers
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { defaults as defaultControls } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import { Vector } from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { Fill, Stroke, Circle, Style } from 'ol/style';
import { PopupComponent } from '../popup/popup.component';

// Reprojections and conversions
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: Map = null;
  private mapId = 'MyMap';

  // TODO: swap for Angular 8!
  @ViewChild(PopupComponent, {static: false}) popup;
  // @ViewChild(PopupComponent) popup;

  constructor() { }

  ngAfterViewInit() {
    // Define and register projection
    proj4.defs('EPSG:25833', '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs');
    register(proj4);

    // Create a new vector source
    const vectorSource = new VectorSource({
      format: new GeoJSON({}),
      attributions: [
        '<a href="https://daten.berlin.de/datensaetze/co2-emissionen-durch-anlagen-nach-dem-treibhausgas-emissionshandelsgesetz-tehg-2"' +
        ' target="_blank">Umweltatlas Berlin / TEHG (dl-de/by-2-0)</a>'
      ],
      url: (extent): string => {
        return 'https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s08_07_2tehganlagen?service=wfs&' +
        'version=1.1.0&request=GetFeature&typename=fis:s08_07_2tehganlagen&outputFormat=application/json';
      },
      strategy: bboxStrategy
    });

    // Create style
    const pointStyle = new Style({
      image: new Circle({
        fill: new Fill({
          color: 'rgba(255,255,255,0.4)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2
        }),
        radius: 5
      })
    });

    // Create a vector layer
    const vectorLayer = new Vector({
      source: vectorSource,
      style: pointStyle
    });

    // Create the map
    this.map = new Map({
      target: this.mapId,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([13.4050, 52.5200]),
        zoom: 11
      }),
      overlays: [this.popup.popup],
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            1418858.226930063, 6854302.831833711,
            1565617.3212376016, 6935096.770731142
          ]
        })
      ])
    });

    // Display popup on click
    this.map.on('click', (event) => {
      const ft = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        return feature;
      });

      if (ft) {
        const facilityName = ft.getProperties().ANLAGENBEZ;
        const coordinates = ft.getGeometry().getCoordinates();
        this.popup.popup.setPosition(coordinates);

        facilityName ? this.popup.content.innerHTML = facilityName : this.popup.content.innerHTML = ft.getProperties().BETREIBER;
      } else {
        this.popup.popup.setPosition(undefined);
      }
    });
  }
}
