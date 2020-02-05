import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { PopupComponent } from './components/popup/popup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageService } from './services/message.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarchartComponent } from './components/barchart/barchart.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PopupComponent,
    DashboardComponent,
    BarchartComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxChartsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})

export class AppModule { }
