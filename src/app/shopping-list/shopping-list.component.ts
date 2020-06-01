import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ListItem } from "./models/list-item";
3;

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"],
})
export class ShoppingListComponent implements OnInit {
  shoppingList: ListItem[] = [];
  constructor() {}

  ngOnInit() {
    // GENERATE dummy list
    for (let index = 0; index < 3; index++) {
      const element = new ListItem();
      element.ListItemId = index;
      element.Name = "Salt" + index;
      element.Order = index;
      this.shoppingList.push(element);
    }
  }
  onNewItem(){
    console.log('Clicked');
  }
}
