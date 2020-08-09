import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[appBackNavigation]'
})
export class BackNavigationDirective {

  constructor(private location: Location) { }

  @HostListener('click')
  onClick() {
    console.log("Clicked Back");
    this.location.back();
  }
}
