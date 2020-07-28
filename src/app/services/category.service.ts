import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private url =  'https://localhost:44361/api/category/';

    constructor(private http: HttpClient) {}

    getCategories() {
        return this.http.get<Category[]>(this.url);
    }
}
