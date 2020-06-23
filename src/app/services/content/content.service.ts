import { Injectable } from '@angular/core';
import {territoryInfo} from '../../mock-data';
import {BehaviorSubject} from 'rxjs';
import {IArea, ITerritory} from '../../models/area.model';
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
  private contentBehaviorSubject = new BehaviorSubject<ITerritory>(territoryInfo);
  constructor() { }

  getContent() {
    console.log(this.contentBehaviorSubject.value);
    this.contentBehaviorSubject.value.fields.map((field: IArea) => {
      if (field.acres <= AreasEnum.xSmall) {
        field.color = areasColors[AreasEnum.xSmall];
      } else if (field.acres <= AreasEnum.small) {
        field.color = areasColors[AreasEnum.small];
      } else if (field.acres <= AreasEnum.medium) {
        field.color = areasColors[AreasEnum.medium];
      } else if (field.acres <= AreasEnum.large) {
        field.color = areasColors[AreasEnum.large];
      } else {
        field.color = areasColors[AreasEnum.xLarge];
      }
    });
    return this.contentBehaviorSubject.asObservable();
  }

  filterContent(areaSize: number): void {
    if (!areaSize) {
      this.contentBehaviorSubject.next({...territoryInfo});
      return;
    }
    const content: ITerritory = {...territoryInfo};
    content.fields = content.fields.filter((field: IArea) => field.acres === areaSize);
    this.contentBehaviorSubject.next(content);
  }
}
