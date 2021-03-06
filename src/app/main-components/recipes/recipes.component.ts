import { Component, OnInit } from '@angular/core';
import { CategoryVM } from 'src/app/models/category';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    category: CategoryVM;
    recipes: Recipe[] = [];
    categoryName: string;
    loading: boolean = true;

    constructor(
        private recipeService: RecipesService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const categoryId = this.route.snapshot.params['id'];
        this.categoryName = this.route.snapshot.params['category'];

        this.recipeService
            .GetRecipesByCategory(categoryId)
            .subscribe((result) => {
                this.recipes = result;
                this.recipes.forEach((r) => {
                    if (r.imageFile != null) {
                        r.imageSrc = r.imageFile;
                    }
                });
                this.loading = false;
            });
    }
    onRecipeClick(recipeId) {
        this.router.navigate(['/recipe', { id: recipeId }]);
    }
}
