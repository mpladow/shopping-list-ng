import { CategoryVM } from './../models/category';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class StoragecacheService {
  public cache: CategoryVM[] = [];  
  constructor() {}
  
    store(object: any, keyName: string) {
        // store json in local storage
        this.cache = object;
        return true;
    }

    retrieve(keyName) {
        const content: CategoryVM[] = this.cache;

        return of(content);
        // content.
    }
}
