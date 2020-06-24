import {Component, Input, OnInit} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {FormControl} from '@angular/forms';
import {ITerritory} from '../../models/area.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() mapContent: ITerritory;
  layer: string;

  constructor(private map: MapService) { }
  ngOnInit() {
    this.map.buildMap();
    this.map.drawArea(this.mapContent);
  }

  onStyleChange(e: any) {
    this.layer = e.value;
    this.map.changeMapStyle(e.value);
  }

}
