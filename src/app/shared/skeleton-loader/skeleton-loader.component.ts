import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  template: `
    <div [ngStyle]='getMyStyles()' class="skeleton-load loader"></div>
  `,
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {

  @Input() Cwidth;
    @Input() Cheight;
    @Input() circle: boolean;

  constructor() { }

  ngOnInit() {
  }
  getMyStyles() {
    const myStyles = {
      'width.px': this.Cwidth? this.Cwidth: '',
      'height.px': this.Cheight ? this.Cheight : '',
      'border-radius': this.circle ? this.circle : ''
    };
    return myStyles;
  }

}
