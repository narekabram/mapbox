import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {IArea, ITerritory} from '../../models/area.model';

const mapStyles = {
  street: 'streets-v11',
  satellite: 'satellite-v9'
};

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 40.1241465014504;
  lng = -88.4076029359707;
  zoom = 14;

  constructor() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  changeMapStyle(layer) {
    this.map.setStyle('mapbox://styles/mapbox/' + mapStyles[layer]);
  }

  drawArea(content: ITerritory) {
    const data = [];
    content.fields.forEach((field: IArea) => {
      data.push(field.geometry.features[0]);
    });
    this.map.on('load', () => {
      this.map.addSource('bv', {
        type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data
          }
        });

      this.map.addLayer({
        id: '12S',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data
          }
        },
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.5
        },
        filter: ['==', '$type', 'Polygon']
      });
    });
  }
}
