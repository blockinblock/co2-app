import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MessageService } from './services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { IntroComponent } from './components/intro/intro.component';

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
  public dashState = 'dash-out';
  public legendState = false;
  private legendinfoState = false;

  constructor(private messageService: MessageService, public dialog: MatDialog) {
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

      // Show legend info
      if (value === 'legendinfo-in') {
        this.legendinfoState = true;
      }
    });

    // Open intro dialog
    const dialogRef = this.dialog.open(IntroComponent,
      {
        height: '330px',
        width: '500px'
    });
  }
}
