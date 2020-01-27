import { Component, AfterViewInit } from '@angular/core';

import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements AfterViewInit {

  private popup;
  private content;

  constructor() { }

  ngAfterViewInit() {
    // https://stackoverflow.com/questions/37587732/how-to-call-another-components-function-in-angular2
    // https://openlayers.org/en/latest/examples/icon.html
    // https://openlayers.org/en/latest/examples/popup.html

    // Elements that make up the popup
    const container = document.getElementById('popup');
    const closer = document.getElementById('popup-closer');

    this.content = document.getElementById('popup-content');

    // Create an overlay to anchor the popup to the map
    this.popup = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    // Click handler to hide the popup
    closer.onclick = () => {
      this.popup.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
}
