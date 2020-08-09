import { RecipeVM, Recipe } from './../models/recipe';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    baseUrl = 'https://localhost:44361/api/recipes/';

    constructor(private http: HttpClient) {}

    getPublishedRecipes() {
        return this.http.get<RecipeVM[]>(this.baseUrl + 'GetPublishedRecipes');
    }
    getRecipeById(id: number) {
        return this.http.get<Recipe>(this.baseUrl + id).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
}
