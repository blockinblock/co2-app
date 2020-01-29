import { Component, AfterViewInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements AfterViewInit {

  private popup;
  private content;
  // private menuState = 'out';

  constructor(private messageService: MessageService) { }

  ngAfterViewInit() {
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

  showDash() {
    // 1-line if statement that toggles the value:
    // this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.messageService.setMessage('in');
  }
}
