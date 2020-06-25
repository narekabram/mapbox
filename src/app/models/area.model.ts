import {LngLatLike} from 'mapbox-gl';

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
  geometry?: IGeometry;
  acres: number;
  color?: string;
}

export interface IGeometry {
  id?: string;
  type?: string;
  features?: IGeometry[];
  coordinates?: LngLatLike[][][];
  properties?: IArea;
  geometry?: IGeometry;
}
