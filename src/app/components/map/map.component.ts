import { Component, OnInit } from '@angular/core';
import {MapService} from '../../services/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private map: MapService) { }
  ngOnInit() {
    this.map.buildMap();
  }

  onStyleChange(e: Event) {
    console.log(e.value);
    this.map.changeMapStyle(e.value);
  }

}
