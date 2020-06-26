import {Component, Input, OnInit} from '@angular/core';
import {IGeometry} from '../../models/area.model';
import {MapService} from '../../services/map/map.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() area: IGeometry;
  constructor(private map: MapService) { }

  ngOnInit() {
  }

  flyTo() {
    this.map.flyTo(this.area);
  }

}
