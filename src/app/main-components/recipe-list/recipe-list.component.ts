import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Recipe, RecipeListVM, RecipeVM } from './../../models/recipe';
import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { CategoryVM } from 'src/app/models/category';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
    recipes: RecipeVM[] = [];
    categories: CategoryVM[] = [];

    constructor(
        private recipeService: RecipesService,
        private categoryService: CategoryService,
        private router: Router
    ) {}

    ngOnInit() {
        this.recipeService.getPublishedRecipes().subscribe((data) => {
            console.log(data);
            this.recipes = data;
        });
        this.categoryService.getCategories().subscribe((data) => {
            this.categories = data;
            this.categories.forEach((c) => {
                if (c.imageBase64 != null) {
                    let src = 'data:image/jpeg;base64,';
                    src += c.imageBase64;
                    c.imageSrc = src;
                }
            });
        });
    }
    onCategoryClick(categoryId, category) {
        this.router.navigate([
            '/recipes',
            { id: categoryId, category: category },
        ]);
    }
}
