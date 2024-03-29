import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxViewerModule } from 'ngx-viewer';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InformationComponent } from './components/information/information.component';
import { UnknownComponent } from './components/unknown/unknown.component';
import { MapComponent } from './components/map/map.component';
import { ImagerComponent } from './components/imager/imager.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoaderComponent,
    InformationComponent,
    UnknownComponent,
    MapComponent,
    ImagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
