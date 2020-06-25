import { Component, OnInit } from '@angular/core';
import {ITerritory} from '../../models/area.model';
import {ContentService} from '../../services/content/content.service';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.scss']
})
export class MapWrapperComponent implements OnInit {

  content: ITerritory;
  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.InitContent();
    this.contentService.getContent().subscribe(content => {
      this.content = content;
    });
  }

}
