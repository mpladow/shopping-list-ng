import { StoragecacheService } from './storagecache.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryVM } from '../models/category';
import { map } from 'rxjs/operators';
import { CachedImage } from '../models/cachedImage';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _cachedCategories: Category[] = [];

    private url = environment.apiUrl + 'category/';

    constructor(
        private http: HttpClient,
        private storageCache: StoragecacheService
    ) {}

    getCategories() {
        //check if localstorage has data. if it doesnt, do request.

        // store json in cache storage
        return this.storageCache.retrieve('categories').pipe((response) => {
            let array = response['value'] as Array<CategoryVM>;
            if (array.length > 0) {
                return response;
            } else {
                return this.http.get<Category[]>(this.url).pipe(
                    map((result: any) => {
                        this.storageCache.store(result, 'categories');
                        return result;
                    })
                );
            }
        });
    }
    getCategoryById(id: number) {
        return this.http.get<Category>(this.url + id).pipe(
            map((response: Category) => {
                return response;
            })
        );
    }
    createNewCategory(model: Category) {
        return this.http.post(this.url, model).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
    editCategory(model: Category) {
        return this.http.post(this.url, model).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
    deleteCategoryById(id: number) {
        return this.http.delete(this.url + id);
    }
    reorderCategories(model: Array<Category>) {
        console.log({'model': model});
        return this.http.post(this.url + 'reordercategories', model).pipe(
            map((response:any) =>  {
                return response;
            })
        )
    }
}
