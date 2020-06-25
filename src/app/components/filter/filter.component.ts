import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ContentService} from '../../services/content/content.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  areaFormControl = new FormControl();
  formControlSubscription: Subscription;
  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.formControlSubscription = this.areaFormControl.valueChanges.pipe(debounceTime(300))
      .subscribe((area: number) => {
        this.contentService.filterContent(area);
      });
  }

  ngOnDestroy(): void {
    this.formControlSubscription.unsubscribe();
  }
}
