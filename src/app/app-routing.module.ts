import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {MapWrapperComponent} from './components/map-wrapper/map-wrapper.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    // in big project we need to create separate module for map with lazy load
    path: 'map',
    component: MapWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
