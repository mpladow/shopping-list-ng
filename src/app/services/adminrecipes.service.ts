import { Recipe, RecipeListVM } from './../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AdminrecipesService {
    private url = 'https://localhost:44361/api/AdminRecipes/';

    constructor(private http: HttpClient) {}

    getAllRecipes() {
        return this.http.get<RecipeListVM[]>(this.url);
    }
    createNewRecipe(recipe: Recipe) {
        return this.http.post(this.url, recipe).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
}
