import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './modules/core/core.module';
import {SharedModule} from './modules/shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import { MapWrapperComponent } from './components/map-wrapper/map-wrapper.component';
import { ContentComponent } from './components/content/content.component';
import { MapComponent } from './components/map/map.component';
import { FilterComponent } from './components/filter/filter.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MapWrapperComponent,
    ContentComponent,
    MapComponent,
    FilterComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
