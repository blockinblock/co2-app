import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-introbtn',
  templateUrl: './introbtn.component.html',
  styleUrls: ['./introbtn.component.css']
})

export class IntrobtnComponent {

  constructor(private messageService: MessageService) { }

  public showInfo() {
    this.messageService.setMessage('intro-toggle');
  }
}
