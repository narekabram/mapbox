import {LngLatLike} from 'mapbox-gl';
import {Feature, MultiPolygon} from 'geojson';

export interface ITerritory {
  count: number;
  max: number;
  offset: number;
  fields?: IArea[];
  geometry?: IGeometry;
}

export interface IArea {
  state?: string;
  geometryId?: number;
  geom_id?: number;
  geometry?: IGeometry | MultiPolygon;
  acres: number;
  color?: string;
}

export interface IGeometry extends Feature {
  features?: IGeometry[];
  coordinates: LngLatLike;
}
