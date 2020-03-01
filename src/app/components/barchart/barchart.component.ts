import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})

export class BarchartComponent {
  private data: any[];

  view: any[] = [700, 200];

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'CO2 equiv. emissions';
  // yScaleMin = 0;
  // yScaleMax = 3300000;

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  colorScheme = {
    domain: ['#8fbc8f']
  };

  constructor(private messageService: MessageService) {
    // Get feature details
    this.messageService.setFeature$.subscribe((value) => {
      let dataArr = [];

      // TODO: explanation of co2 on hover
      const startYear = 2005;
      const endYear = 2017;

      for (let i = startYear; i <= endYear; i++) {
        let val;

        // Workaround for values that are zero
        value[`SD${i}`] === '' ? val = '0.00000000000000001' : val = value[`SD${i}`];

        dataArr.push(
          {
            name: i,
            value: val
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

  onSelect(event) {
    console.log(event);
  }
}
