import {Component, Input, OnInit} from '@angular/core';
import {ITerritory} from '../../models/area.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() mapContent: ITerritory;
  constructor() { }

  ngOnInit() {
  }

}
