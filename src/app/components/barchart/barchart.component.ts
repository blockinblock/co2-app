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
      let dataArr: any[];

      // TODO: explanation of co2 on hover
      // TODO: Better way to do this? e.g. What if there are no values, function to create array?
      dataArr = [
          {
            name: '2005',
            value: value.SD2005
          },
          {
            name: '2006',
            value: value.SD2006
          },
          {
            name: '2007',
            value: value.SD2007
          },
          {
            name: '2008',
            value: value.SD2008
          },
          {
            name: '2009',
            value: value.SD2009
          },
          {
            name: '2010',
            value: value.SD2010
          },
          {
            name: '2011',
            value: value.SD2011
          },
          {
            name: '2012',
            value: value.SD2012
          },
          {
            name: '2013',
            value: value.SD2013
          },
          {
            name: '2014',
            value: value.SD2014
          },
          {
            name: '2015',
            value: value.SD2015
          },
          {
            name: '2016',
            value: value.SD2016
          },
          {
            name: '2017',
            value: value.SD2017
          }
      ];
      this.data = dataArr;
      console.log(dataArr);

      // Assign chart object
      Object.assign(this, { dataArr });
    });
  }

  // formatNumber(value) {
  //   // TODO: if value is empty??
  //   const formattedNum = (parseInt(value, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  //   console.log(formattedNum);

  //   return value;
  // }

  onSelect(event) {
    console.log(event);
  }
}
