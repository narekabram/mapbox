import { Injectable } from '@angular/core';
import {territoryInfo} from '../../mock-data';
import {BehaviorSubject, of} from 'rxjs';
import {IArea, IGeometry, ITerritory} from '../../models/area.model';
import {AreasEnum} from '../../enums/areas.enum';

const areasColors = {
  20: '#E8474B',
  50: '#26B0F9',
  80: '#F4B939',
  120: '#01BC66',
  Infinity: '#A39BFE'
};

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private mapContent: ITerritory;
  private contentBehaviorSubject = new BehaviorSubject<ITerritory>(null);
  constructor() { }

  InitContent() {
    this.mapContent = {
      count: territoryInfo.count,
      max: territoryInfo.max,
      offset: territoryInfo.offset,
      geometry: {
        type: territoryInfo.fields[0].geometry.type,
        features: []
      }
    };

    for (const field of territoryInfo.fields) {
      const feature = field.geometry.features[0];
      this.mapContent.geometry.features.push({
        ...feature,
        properties: {
          ...feature.properties,
          color: this.filterColors(feature.properties.acres)
        }
      } as any);
    }

    this.contentBehaviorSubject.next(this.mapContent);
  }

  filterContent(areaSize: number): void {
    if (!areaSize) {
      this.contentBehaviorSubject.next({...this.mapContent});
      return;
    }
    let features: IGeometry[] = this.mapContent.geometry.features;
    features = features.filter((feature: IGeometry) => feature.properties.acres === areaSize);
    this.contentBehaviorSubject.next({
      ...this.mapContent,
      geometry: {
        ...this.mapContent.geometry,
        features,
      }});
  }

  getContent() {
    return this.contentBehaviorSubject.asObservable();
  }

  filterColors(acres) {
    if (acres <= AreasEnum.xSmall) {
      return areasColors[AreasEnum.xSmall];
    } else if (acres <= AreasEnum.small) {
      return areasColors[AreasEnum.small];
    } else if (acres <= AreasEnum.medium) {
      return areasColors[AreasEnum.medium];
    } else if (acres <= AreasEnum.large) {
      return areasColors[AreasEnum.large];
    } else {
      return areasColors[AreasEnum.xLarge];
    }
  }
}
