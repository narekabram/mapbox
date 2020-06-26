import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {IGeometry, ITerritory} from '../../models/area.model';
import {MultiPolygon} from 'geojson';

const mapStyles = {
  street: 'streets-v11',
  satellite: 'satellite-v9'
};

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  zoom = 12;
  popup;
  mapData: ITerritory;

  constructor() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
  }

  buildMap(mapContent: ITerritory, mapStyle: string) {
    const geometry = mapContent.geometry.features[0].geometry as MultiPolygon;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/' + mapStyles[mapStyle],
      zoom: this.zoom,
      center: geometry.coordinates[0][0][0] as mapboxgl.LngLatLike
    });
  }

  changeMapStyle(layer, mapContent: ITerritory) {
    this.map.setStyle('mapbox://styles/mapbox/' + mapStyles[layer]);
  }

  setSourceData(content: ITerritory) {
    this.mapData = content;
    const source = this.map.getSource(`${content.offset}`) as mapboxgl.GeoJSONSource;
    source.setData(content.geometry);
  }

  addSource() {
    // lets consider offset is our source id
    if (this.map.getSource(`${this.mapData.offset}`)) {
      return this.setSourceData(this.mapData);
    }

    this.map.addSource(`${this.mapData.offset}`, {
      type: 'geojson',
      data: this.mapData.geometry
    });

    this.map.addLayer({
      id: `${this.mapData.geometry.features[0].id}`,
      type: 'fill',
      source: `${this.mapData.offset}`,
      paint: {
        'fill-color': ['get', 'color'],
        'fill-opacity': 0.8
      },
      filter: ['==', '$type', 'Polygon']
    });
  }

  drawMap(content: ITerritory) {
    this.mapData = content;
    this.map.on('load', this.addSource.bind(this, content));
    this.map.on('style.load', this.addSource.bind(this, content));
    this.map.on('click', content.geometry.features[0].id + '', this.openPopup.bind(this));
  }

  openPopup(e) {
    this.showPopup(e.features[0], e.lngLat);
  }

  flyTo(area: IGeometry) {
    const geometry = area.geometry as MultiPolygon;
    const coordinates = this.countCoordinates(geometry.coordinates[0][0] as mapboxgl.LngLatLike[]);
    this.map.flyTo({center: coordinates as mapboxgl.LngLatLike, zoom: 14});
    this.showPopup(area, coordinates);
  }

  showPopup(area: IGeometry, coordinates) {
    this.popup && this.popup.remove();
    this.popup = new mapboxgl.Popup({closeOnClick: false})
      .setLngLat(coordinates)
      .setHTML(`<div><p>state: ${area.properties.state}</p><p>acres: ${area.properties.acres}</p></div>`)
      .addTo(this.map);
  }

  removeEventListeners() {
    this.map.off('load', this.addSource);
    this.map.off('click', this.openPopup);
    this.map.off('style.load', this.addSource);
  }

  countCoordinates(coordinates: mapboxgl.LngLatLike[]) {
    if (coordinates.length === 1) {
      return coordinates[0];
    }

    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (const coordinate of coordinates) {
      const latitude = coordinate[0] * Math.PI / 180;
      const longitude = coordinate[1] * Math.PI / 180;

      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }

    const total = coordinates.length;

    x = x / total;
    y = y / total;
    z = z / total;

    const centralLongitude = Math.atan2(y, x);
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = Math.atan2(z, centralSquareRoot);

    return [
      centralLatitude * 180 / Math.PI,
      centralLongitude * 180 / Math.PI
    ];
  }
}
