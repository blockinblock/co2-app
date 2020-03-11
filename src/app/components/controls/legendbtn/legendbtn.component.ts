import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-legendbtn',
  templateUrl: './legendbtn.component.html',
  styleUrls: ['./legendbtn.component.css']
})
export class LegendbtnComponent {

  constructor(private messageService: MessageService) { }

  private showLegend() {
    this.messageService.setMessage('legend-toggle');
  }
}
