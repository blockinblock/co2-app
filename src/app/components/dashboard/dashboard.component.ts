import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const closer = document.getElementById('popup-closer-dash');

    // Click handler to hide the popup
    closer.onclick = () => {
      this.messageService.setMessage('out');
      closer.blur();
      return false;
    };
  }
}
