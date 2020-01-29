import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 100%, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})

export class AppComponent {
  title = 'co2-app';
  private menuState = 'out';

  // https://angular.io/guide/animations
  // https://www.thecodecampus.de/blog/angular-2-animate-creating-sliding-side-navigation/

  constructor(private messageService: MessageService) {
    this.messageService.setMessage$.subscribe((value) => {
      this.menuState = value;
    });
  }
}
