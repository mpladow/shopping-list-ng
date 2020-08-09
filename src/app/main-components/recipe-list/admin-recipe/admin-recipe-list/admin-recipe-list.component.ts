import { RecipeListVM, RecipeVM } from './../../../../models/recipe';
import { AdminrecipesService } from 'src/app/services/adminrecipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

@Component({
    selector: 'app-admin-recipe-list',
    templateUrl: './admin-recipe-list.component.html',
    styleUrls: ['./admin-recipe-list.component.scss'],
})
export class AdminRecipeListComponent implements OnInit {
    public recipeList: RecipeVM[] = [];
    pageNumber = 1;
    pageSize = 5;
    displayedColumns: string[] = ['Id', 'Name', 'Category', 'Published At'];

    constructor(private adminRecipesService: AdminrecipesService) {}

    ngOnInit() {
        this.adminRecipesService.getAllRecipes(this.pageNumber, this.pageSize).subscribe((data) => {
            this.recipeList = data.result;
            console.log(data);
        });
    }
}
