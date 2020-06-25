import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {IArea, IGeometry, ITerritory} from '../../models/area.model';
import {territoryInfo} from '../../mock-data';

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
  zoom = 12;

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

  setSourceData(content: ITerritory) {
    this.map.getSource(`${content.offset}`)['setData'](content.geometry);
  }

  addSource(content: ITerritory) {
    // lets consider offset is our source id
    this.map.addSource(`${content.offset}`, {
      type: 'geojson',
      data: content.geometry as any
    });

    content.geometry.features.forEach((field: IGeometry) => {
      this.map.addLayer({
        id: `${field.properties.geom_id}`,
        type: 'fill',
        source: `${content.offset}`,
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.8
        },
        filter: ['==', '$type', 'Polygon']
      });
    });
  }

  drawArea(content: ITerritory) {
    this.map.on('load', () => {
        this.addSource(content);
      }
    );
  }

  flyTo(area: IGeometry) {
    const coordinates = this.countCoordinates(area);
    this.map.flyTo({center: coordinates, zoom: 14});
  }

  countCoordinates(area: IGeometry) {
    const areaCenter = Math.round(area.geometry.coordinates[0][0].length / 2);
    return area.geometry.coordinates[0][0][areaCenter];
  }
}
