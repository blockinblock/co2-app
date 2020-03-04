import { Component, AfterViewInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements AfterViewInit {

  constructor(private messageService: MessageService) { }

  ngAfterViewInit() {
    const closer = document.getElementById('popup-closer-dash');

    // Click handler to hide the popup
    closer.onclick = () => {
      this.messageService.setMessage('dash-out');
      closer.blur();
      return false;
    };
  }
}
