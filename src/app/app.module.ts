import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
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
import { FormatNumberPipe } from './utils/format-number.pipe';
import { LegendComponent } from './components/legend/legend.component';
import { IntroComponent } from './components/intro/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
    DashboardComponent,
    BarchartComponent,
    DetailsComponent,
    LegendbtnComponent,
    FormatNumberPipe,
    LegendComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatButtonModule,
    MatTableModule,
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
