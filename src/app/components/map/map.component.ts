import { Component, AfterViewInit, ViewChild } from '@angular/core';

// OpenLayers
import 'ol/ol.css';
import Map from 'ol/Map';
import { pointerMove } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { defaults as defaultControls } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import { Vector } from 'ol/layer';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { colourMapNormal, colourMapHi } from './ol.styles';
import { data } from './data';

// Reprojections and conversions
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';

// App components
import { PopupComponent } from '../popup/popup.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: Map = null;
  private mapId = 'MyMap';
  private jsonResponse;
  private vectorLayer = new Vector();

  private mapExtent = [1472322.7367111205, 6874492.281365124, 1515891.0947332494, 6915771.816390304];

  private url = 'https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s08_07_2tehganlagen?service=wfs&' +
                'version=1.1.0&request=GetFeature&typename=fis:s08_07_2tehganlagen&outputFormat=application/json';

  private vectorSource = new VectorSource({
    attributions: [
      '<a href="https://daten.berlin.de/datensaetze/co2-emissionen-durch-anlagen-nach-dem-treibhausgas-emissionshandelsgesetz-tehg-2"' +
      ' target="_blank">Umweltatlas Berlin / TEHG (dl-de/by-2-0)</a>'
    ]
  });

  // Set hover style
  private select = new Select({
    condition: pointerMove,
    style: feature => {
      return colourMapHi.get(this.getStyleClass(feature));
    }
  });

  // TODO: swap for Angular 8!
  @ViewChild(PopupComponent, {static: false}) popup;
  // @ViewChild(PopupComponent) popup;

  constructor(private messageService: MessageService) { }

  /**
   * Takes a feature and determines the styling class
   * @param feature an OpenLayers Feature (ol/Feature)
   */
  private getStyleClass(feature) {
    const val = feature.get('SD2017');
    let styleClass;

    if (val <= 100000) {
      styleClass = 0;
    } else if (val > 100000 && val <= 500000) {
      styleClass = 1;
    } else if (val > 500000 && val <= 1000000) {
      styleClass = 2;
    } else if (val > 1000000) {
      styleClass = 3;
    } else {
      styleClass = 4;
    }
    return styleClass;
  }

  ngAfterViewInit() {
    // Define and register projection
    proj4.defs('EPSG:25833', '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs');
    register(proj4);

    // Create map
    this.map = new Map({
      target: this.mapId,
      layers: [
        new TileLayer({
          className: 'bw',
          source: new OSM()
        })
      ],
      overlays: [this.popup.popup],
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: this.mapExtent
        })
      ])
    });
    this.map.getView().fit(this.mapExtent);

    // Display popup on click
    this.map.on('click', event => {
      const ft = this.map.forEachFeatureAtPixel(event.pixel, feature => {
        return feature;
      });

      if (ft) {
        const facilityName = ft.getProperties().ANLAGENBEZ;
        const coordinates = ft.getGeometry().getCoordinates();
        this.popup.popup.setPosition(coordinates);

        facilityName ? this.popup.content.innerHTML = facilityName : this.popup.content.innerHTML = ft.getProperties().BETREIBER;

        this.messageService.setFeature(ft.getProperties());
      } else {
        // Close popup and dashboard
        this.popup.popup.setPosition(undefined);
        this.messageService.setMessage('dash-out');
      }
    });

    // Change feature styling on hover
    this.map.addInteraction(this.select);

    // Get the data async
    const getData = async () => {
      try {
        const response = await fetch(this.url);
        this.jsonResponse = await response.json();

      } catch (e) {    
        // Use the backup data
        this.jsonResponse = data;
        console.log(e);

      } finally {
        // Create the features
        const features = new GeoJSON({
          dataProjection: 'EPSG:25833',
          featureProjection: 'EPSG:3857'
        }).readFeatures(this.jsonResponse);

        // Add features and set styling
        this.vectorSource.addFeatures(features);
        this.vectorSource.getFeatures().forEach(feature => {
          const styleClass = this.getStyleClass(feature);
          feature.setStyle(colourMapNormal.get(styleClass));
        });
      }
    };

    // Add layer once data is ready
    getData().then(() => {
      this.vectorLayer.setSource(this.vectorSource);
      this.map.addLayer(this.vectorLayer);
    });

  }
}
