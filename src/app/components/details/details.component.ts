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
      value.anlagenbez.length > 0 ? name = value.anlagenbez : name = '(no name)';
      this.fName = `${name} (${value.id})`;
      this.fStatus = value.statustyp;
      this.fAddress = `${value.standort}, ${value.plz} Berlin`;
      this.fOperator = value.betreiber;
      this.fClassification = value.nace_wz2008_bez;
    });
  }
}
