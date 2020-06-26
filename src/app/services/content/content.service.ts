import { Injectable } from '@angular/core';
import {territoryInfo} from '../../mock-data';
import {BehaviorSubject} from 'rxjs';
import {IGeometry, ITerritory} from '../../models/area.model';
import {MapEnum} from '../../enums/map.enum';

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
      } as any
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
    if (acres <= MapEnum.xSmall) {
      return areasColors[MapEnum.xSmall];
    } else if (acres <= MapEnum.small) {
      return areasColors[MapEnum.small];
    } else if (acres <= MapEnum.medium) {
      return areasColors[MapEnum.medium];
    } else if (acres <= MapEnum.large) {
      return areasColors[MapEnum.large];
    } else {
      return areasColors[MapEnum.xLarge];
    }
  }
}
