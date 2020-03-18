import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';

export interface FacilityInfo {
  key: string;
  value: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {

  private displayedColumns: string[] = ['label', 'contents'];
  private dataSource;

  constructor(private messageService: MessageService) {
    this.messageService.setFeature$.subscribe((value) => {

      let name;
      value.ANLAGENBEZ.length > 0 ? name = value.ANLAGENBEZ : name = '---';

      const ELEMENT_DATA: FacilityInfo[] = [
        { key: 'ID', value: value.ID },
        { key: 'Name', value: name },
        { key: 'Type', value: value.ANLAGENART },
        { key: 'Status', value: value.STATUS_TYP},
        { key: 'Operator', value: value.BETREIBER },
        { key: 'Address', value: `${value.STANDORT}, ${value.PLZ} Berlin` },
        { key: 'Classification', value: value.NACE_WZ2008_BEZ }
      ];

      this.dataSource = ELEMENT_DATA;
    });
  }
}
