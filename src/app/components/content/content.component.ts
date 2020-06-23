import { Component, OnInit } from '@angular/core';
import {ITerritory} from '../../models/area.model';
import {ContentService} from '../../services/content/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  content: ITerritory;
  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getContent().subscribe(content => {
      this.content = content;
    });
  }

}
