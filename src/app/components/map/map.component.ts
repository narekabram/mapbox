import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {ITerritory} from '../../models/area.model';
import {MapStyleEnum} from '../../enums/map.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {

  @Input() mapContent: ITerritory;
  isSourceShown = true;
  mapStyle = MapStyleEnum.street;

  constructor(private map: MapService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const mapContent: ITerritory = changes.mapContent.currentValue;
    if (changes.mapContent.previousValue) {
      this.map.setSourceData(mapContent);
    }
  }

  ngOnInit() {
    this.initMap(this.mapContent, this.mapStyle);
  }

  initMap(mapContent: ITerritory, mapStyle: string) {
    this.map.buildMap(mapContent, mapStyle);
    this.map.drawMap(mapContent);
  }

  onStyleChange(e: any) {
    this.map.changeMapStyle(e.value, this.mapContent);
  }

  chaneLayersViewStatus(event) {
    this.isSourceShown = event.value;
    if (event.value) {
      this.map.setSourceData(this.mapContent);
    } else {
      this.map.setSourceData({
        ...this.mapContent,
        geometry: {
          ...this.mapContent.geometry,
          features: []
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.map.removeEventListeners();
  }

}
