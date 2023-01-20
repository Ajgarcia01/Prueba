import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CsvreadComponent } from './csvread/csvread.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
    CsvreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
