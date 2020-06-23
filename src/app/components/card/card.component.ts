import {Component, Input, OnInit} from '@angular/core';
import {IArea} from '../../models/area.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() area: IArea;
  constructor() { }

  ngOnInit() {
  }

}
