import { CategoryService } from 'src/app/services/category.service';
import { Recipe, RecipeListVM, RecipeVM } from './../../models/recipe';
import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { CategoryVM } from 'src/app/models/category';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  private recipes: RecipeVM[] = [];
  private categories: CategoryVM[] = [];

  constructor(private recipeService: RecipesService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.recipeService.getPublishedRecipes().subscribe(data => {
      console.log(data);
      this.recipes = data;
    });
  }

}
