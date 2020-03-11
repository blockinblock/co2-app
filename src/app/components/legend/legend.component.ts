import { Component } from '@angular/core';
import { styles } from '../map/ol.styles';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})

export class LegendComponent {

  private legendItems = [];
  private styles;

  constructor() {
    this.styles = styles;

    // Build the legend items
    this.styles.forEach(item => {
      const txt = item.desc;
      const col = item.normal.getImage().getFill().getColor();

      this.legendItems.push(
        {
          text: txt,
          color: col
        }
      );
    });
  }
}
