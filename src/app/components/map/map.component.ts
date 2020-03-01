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
import { colourMap } from './ol.styles';

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

  private select = new Select({
    condition: pointerMove,
    style: (feature) => {
      return colourMap.get(`${this.getStyleClass(feature)}Hi`);    
    }
  });

  private url = 'https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s08_07_2tehganlagen?service=wfs&' +
                'version=1.1.0&request=GetFeature&typename=fis:s08_07_2tehganlagen&outputFormat=application/json';

  private vectorSource = new VectorSource({
    attributions: [
      '<a href="https://daten.berlin.de/datensaetze/co2-emissionen-durch-anlagen-nach-dem-treibhausgas-emissionshandelsgesetz-tehg-2"' +
      ' target="_blank">Umweltatlas Berlin / TEHG (dl-de/by-2-0)</a>'
    ]
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
    let styleClass = '';

    if (val <= 100000) {
      styleClass = 'green';
    } else if (val > 100000 && val <= 500000) {
      styleClass = 'yellow';
    } else if (val > 500000 && val <= 1000000) {
      styleClass = 'red';
    } else if (val > 1000000) {
      styleClass = 'purple';
    } else {
      styleClass = 'nodata';
    }
    return styleClass;
  }

  ngAfterViewInit() {
    // Define and register projection
    proj4.defs('EPSG:25833', '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs');
    register(proj4);

    // Get the data
    fetch(this.url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((json) => {
      const features = new GeoJSON({
        dataProjection: 'EPSG:25833',
        featureProjection: 'EPSG:3857'
      }).readFeatures(json);
      this.vectorSource.addFeatures(features);

      // Work out style class and get it from the colour map
      this.vectorSource.getFeatures().forEach(feature => {        
        const styleClass = this.getStyleClass(feature);
        feature.setStyle(colourMap.get(styleClass));
      });

      this.map.getView().fit(this.vectorSource.getExtent());
    }).catch((error) => {
      console.log(error);
    });

    // Create the map
    this.map = new Map({
      target: this.mapId,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new Vector({
          source: this.vectorSource
        })
      ],
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

        this.messageService.setFeature(ft.getProperties());
      } else {
        // Close popup and dashboard
        this.popup.popup.setPosition(undefined);
        this.messageService.setMessage('out');
      }
    });

    // Change feature styling on hover
    this.map.addInteraction(this.select);
  }
}
