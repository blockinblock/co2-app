import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('dashInOut', [
      state('dash-in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('dash-out', style({
        transform: 'translate3d(0, 100%, 0)'
      })),
      transition('dash-in => dash-out', animate('400ms ease-in-out')),
      transition('dash-out => dash-in', animate('400ms ease-in-out'))
    ])
  ]
})

export class AppComponent {
  title = 'co2-app';
  private dashState = 'dash-out';
  private legendState = false;

  constructor(private messageService: MessageService) {
    this.messageService.setMessage$.subscribe(value => {
      // Toggle dashboard
      if (value === 'dash-out' || value === 'dash-in') {
        this.dashState = value;
      }

      // Toggle legend
      if (value === 'legend-toggle') {
        if (this.legendState === false) {
          this.legendState = true;
        } else if (this.legendState === true) {
          this.legendState = false;
        }
      }
    });
  }
}
