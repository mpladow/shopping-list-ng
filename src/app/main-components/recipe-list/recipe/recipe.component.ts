import { RecipeVM } from './../../../models/recipe';
import { RecipesService } from './../../../services/recipes.service';
import { Recipe } from 'src/app/models/recipe';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
    recipe: Recipe;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private recipeService: RecipesService
    ) {}

    ngOnInit() {
        const recipeId = this.route.snapshot.params['id'];
        this.recipeService.getRecipeById(recipeId).subscribe((result) => {
            console.log(result);
            this.recipe = result;
        });
    }
    onEditClick(e) {
        this.router.navigate(['/admin-recipe-edit', {id: this.recipe.recipeId}]);
    }
}
