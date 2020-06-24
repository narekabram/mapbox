export interface ITerritory {
  count: number;
  max: number;
  offset: number;
  fields: IArea[];
}

export interface IArea {
  state: string;
  geometryId?: number;
  geom_id?: number;
  geometry?: IGeometry;
  acres: number;
  color?: string;
}

export interface IGeometry {
  id?: string;
  type: string;
  features?: IGeometry[];
  coordinates?: number[][];
  properties?: IArea;
  geometry?: IGeometry;
}
