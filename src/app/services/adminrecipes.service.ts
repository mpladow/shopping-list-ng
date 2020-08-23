import { Recipe, RecipeListVM, RecipeVM } from './../models/recipe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminrecipesService {
    private url = environment.apiUrl + 'AdminRecipes/';

    constructor(private http: HttpClient) {}

    getAllRecipes(page?, itemsPerPage?): Observable<PaginatedResult<RecipeVM[]>> {
        const paginatedResult: PaginatedResult<RecipeVM[]> = new PaginatedResult<RecipeVM[]>();

        let params = new HttpParams();

        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }

        return this.http.get<RecipeVM[]>(this.url, {observe: 'response', params})
        .pipe(
        map(response => { // we use pipe.map() if we want to transform a response
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('pagination'))

                return paginatedResult;
            }

        })
        ); // we need to get access to the headers in the response
    }
    getRecipeById(id: number) {
        return this.http.get<Recipe>(this.url + id);
    }
    createNewRecipe(recipe: Recipe) {
        return this.http.post(this.url, recipe).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
    deleteRecipeById(id: number) {
        return this.http.delete(this.url + id);
    }
}
