import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { PopupComponent } from './components/popup/popup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageService } from './services/message.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarchartComponent } from './components/barchart/barchart.component';
import { DetailsComponent } from './components/details/details.component';
import { LegendbtnComponent } from './components/controls/legendbtn/legendbtn.component';
import { LegendComponent } from './components/legend/legend.component';
import { IntroComponent } from './components/intro/intro.component';
import { IntrobtnComponent } from './components/controls/introbtn/introbtn.component';
import { FormatNumberPipe } from './utils/format-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
    DashboardComponent,
    BarchartComponent,
    DetailsComponent,
    LegendbtnComponent,
    LegendComponent,
    IntrobtnComponent,
    IntroComponent,
    FormatNumberPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  entryComponents: [IntroComponent]
})

export class AppModule { }
