import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {IArea, ITerritory} from '../../models/area.model';
import {ContentService} from '../../services/content/content.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() mapContent: ITerritory;
  isSourceShown = true;

  constructor(private map: MapService, private contentService: ContentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const mapContent: ITerritory = changes.mapContent.currentValue;
    if (changes.mapContent.previousValue) {
      this.map.setSourceData(mapContent);
    }
  }

  ngOnInit() {
    this.map.buildMap();
    this.map.drawArea(this.mapContent);
  }

  onStyleChange(e: any) {
    this.map.changeMapStyle(e.value);
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

}
