import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  public dataSource;
  public fName;
  public fType;
  public fStatus;
  public fAddress;
  public fOperator;
  public fClassification;

  constructor(private messageService: MessageService) {
    this.messageService.setFeature$.subscribe((value) => {
      let name;
      value.ANLAGENBEZ.length > 0 ? name = value.ANLAGENBEZ : name = '(no name)';
      this.fName = `${name} (${value.ID})`;
      this.fType = value.ANLAGENART;
      this.fStatus = value.STATUS_TYP;
      this.fAddress = `${value.STANDORT}, ${value.PLZ} Berlin`;
      this.fOperator = value.BETREIBER;
      this.fClassification = value.NACE_WZ2008_BEZ;
    });
  }
}
