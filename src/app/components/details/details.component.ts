import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  private facilityID;

  constructor(private messageService: MessageService) {
    this.messageService.setFeature$.subscribe((value) => {
      console.log('ft:');
      console.log(value);
      this.facilityID = value.ID;

    });
  }

  ngOnInit() {
  }

}
