import { AdminrecipesService } from 'src/app/services/adminrecipes.service';
import { AdminRecipeEditComponent } from './../admin-recipe/admin-recipe-edit/admin-recipe-edit.component';
import { AlertifyService } from 'src/app/services/alertify.service';
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
    selectedIngredients: Array<string> = [];
    loading: boolean = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private recipeService: RecipesService,
        private alertifyService: AlertifyService,
        private adminRecipeService: AdminrecipesService
    ) {}

    ngOnInit() {
        const recipeId = this.route.snapshot.params['id'];
        this.recipeService.getRecipeById(recipeId).subscribe((result) => {
            this.recipe = result;
            console.log(result);
            if (this.recipe.imageFile != null) {
                // let src = 'data:image/png;base64,';
                // src += this.recipe.imageFile;
                // this.recipe.imageSrc = src;
                 this.recipe.imageSrc = this.recipe.imageFile;
                // reorder list
            }
            this.recipe.methodItems.sort((a, b) => {
                return a.stepNo - b.stepNo;
            });
            this.recipe.ingredients.sort((a, b) => {
                return a.positionNo - b.positionNo;
            });
            this.loading= false;
        });
    }
    onEditClick(e) {
        console.log("edit")
        this.router.navigate([
            '/admin-recipe-edit',
            { id: this.recipe.recipeId },
        ]);
    }
    onDeleteClick(e) {
        this.alertifyService.confirm('Delete recipe', 'Are you sure you want to delete this recipe? This cannot be undone.', () => {
            this.adminRecipeService.deleteRecipeById(this.recipe.recipeId).subscribe((result: boolean) => {
                if (result) {
                    this.alertifyService.success(`This recipe ${this.recipe.name} was deleted successfully`);
                    this.router.navigate(['/recipe-list']);

                    // return to list.
                } else {
// stay on page and give error
                }
            });
        })
    }
}
