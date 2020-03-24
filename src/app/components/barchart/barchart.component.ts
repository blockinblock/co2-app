import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})

export class BarchartComponent {
  public data: any[];
  private hasData = false;

  view: any[] = [700, 200];

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'CO2-eq';
  roundEdges = false;
  noBarWhenZero = true;

  colorScheme = {
    domain: ['#8fbc8f']
  };

  constructor(private messageService: MessageService) {
    // Get feature details
    this.messageService.setFeature$.subscribe((value) => {
      const dataArr = [];
      const startYear = 2005;
      const endYear = 2017;

      for (let i = startYear; i <= endYear; i++) {

        // If there's data for at least one of the years
        value[`SD${i}`].length > 0 ? this.hasData = true : this.hasData = false;

        dataArr.push(
          {
            name: i,
            value: value[`SD${i}`]
          }
        );
      }
      this.data = dataArr;

      // Assign chart object
      Object.assign(this, { dataArr });
    });
  }

  /**
   * Custom tick formatting to remove locale specific number formatting (thousand seperator)
   * @param val the year to be formatted
   */
  formatYear(val) {
    return val;
  }
}
