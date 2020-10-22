import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnDestroy {
  dataSource: string;
  fName: string;
  fType: string;
  fStatus: string;
  fAddress: string;
  fOperator: string;
  fClassification: string;

  private subs: Subscription;

  constructor(private messageService: MessageService) {
    this.subs = this.messageService.setFeature$.subscribe((value) => {
      let name;
      value.anlagenbez.length > 0 ? name = value.anlagenbez : name = '(no name)';
      this.fName = `${name} (${value.id})`;
      this.fStatus = value.statustyp;
      this.fAddress = `${value.standort}, ${value.plz} Berlin`;
      this.fOperator = value.betreiber;
      this.fClassification = value.nace_wz2008_bez;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
