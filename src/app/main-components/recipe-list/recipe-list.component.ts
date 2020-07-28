import { Recipe, RecipeListVM } from './../../models/recipe';
import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  private recipes: RecipeListVM[] = [];

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipeService.getPublishedRecipes().subscribe(data => {
      console.log(data);
    });
  }

}
