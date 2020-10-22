import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { getStyle } from '../map/ol.styles';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})

export class BarchartComponent implements OnDestroy {
  hasData = false;   // For no data label

  // Chart options
  data: any[];
  view: any[] = [700, 200];
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

  chartData = false;
  domainArr = [];
  colorScheme = {};

  private subs: Subscription;

  constructor(private messageService: MessageService) {
    // Get feature details
    this.subs = this.messageService.setFeature$.subscribe((value) => {
      const dataArr = [];
      const startYear = 2005;
      const endYear = new Date().getFullYear() - 1;

      // Reset barchart
      this.domainArr = [];
      this.colorScheme = {};

      for (let i = startYear; i <= endYear; i++) {
        // If there's data for at least one of the years
        value[`sd${i}`].length > 0 ? this.hasData = true : this.hasData = false;

        dataArr.push(
          {
            name: i,
            value: value[`sd${i}`]
          }
        );

        // Append colors for barchart
        this.domainArr.push(getStyle(value[`sd${i}`], '', 'color'));
      }
      this.data = dataArr;

      // Construct barchart scheme
      this.colorScheme = {
        domain: this.domainArr
      };

      // Assign chart object
      Object.assign(this, { dataArr });

      // Enable the barchart coomponent
      this.chartData = true;
    });
  }

  /**
   * Custom tick formatting to remove locale specific number formatting (thousand seperator)
   * @param val the year to be formatted
   */
  formatYear(val) {
    return val;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
