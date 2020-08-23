import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private url =  environment.apiUrl + 'category/';

    constructor(private http: HttpClient) {}

    getCategories() {
        return this.http.get<Category[]>(this.url).pipe(
            map((response: any) => {
                return response;
            }));
    }
    getCategoryById(id: number) {
        return this.http.get<Category>(this.url + id).pipe(
            map((response: Category) => {
                return response;
            }));
    }
    createNewCategory(model: Category) {
        return this.http.post(this.url, model).pipe(
            map((response: any) => {
                return response;
            }));
    }
    editCategory(model: Category) {
        return this.http.post(this.url, model).pipe(
            map((response: any) => {
                return response;
            }));
    }
    deleteCategoryById(id: number){
        return this.http.delete(this.url + id);
    }
}
