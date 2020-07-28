import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class RecipesService {
    baseUrl = 'https://localhost:44361/api/recipes/';

    constructor(private http: HttpClient) {}

    getPublishedRecipes() {
        return this.http
            .get(this.baseUrl + 'GetPublishedRecipes');
    }
}
