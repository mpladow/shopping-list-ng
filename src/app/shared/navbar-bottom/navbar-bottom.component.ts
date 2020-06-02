import { Component, OnInit } from "@angular/core";
import { formatPercent } from "@angular/common";
import { NavLink } from "../models/navlink";

@Component({
  selector: "app-navbar-bottom",
  templateUrl: "./navbar-bottom.component.html",
  styleUrls: ["./navbar-bottom.component.scss"],
})
export class NavbarBottomComponent implements OnInit {
  navLinks: NavLink[] = [];
  constructor() {}

  ngOnInit() {
    for (let index = 0; index < 2; index++) {
      const element = new NavLink();
      element.label = `Recipes ${index}`;
      if (index === 0) {
        element.label = "Shopping List";
        element.icon = "shopping_cart";
        element.path = "/"
      } else {
        element.label = "Recipes";
        element.icon = "menu_book";
        element.path = "/recipe-list";

      }
      this.navLinks.push(element);
    }
  }
  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }
}
