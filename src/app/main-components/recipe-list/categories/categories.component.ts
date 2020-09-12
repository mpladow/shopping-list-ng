import { Component, OnInit, HostListener } from '@angular/core';
import { RecipeVM } from 'src/app/models/recipe';
import { CategoryVM } from 'src/app/models/category';
import { RecipesService } from 'src/app/services/recipes.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    recipes: RecipeVM[] = [];
    categories: CategoryVM[] = [];
    loaded = false;
    isFixed = false;

    constructor(
        private recipeService: RecipesService,
        private categoryService: CategoryService,
        private router: Router
    ) {}

    ngOnInit() {
        this.recipeService.getPublishedRecipes().subscribe((data) => {
            console.log(data);
            this.recipes = data;
        });

        this.categoryService.getCategories().subscribe((data) => {
            this.categories = data;
            this.categories.forEach((c) => {
                if (c.imageBase64 != null) {
                    // let src = 'data:image/jpeg;base64,';
                    // src += c.imageBase64;
                    // c.imageSrc = src;
                    c.imageSrc = c.imageBase64; // this is not a base64 file
                }
            });
            this.loaded = true;
        });
    }
    onCategoryClick(categoryId, category) {
        this.router.navigate([
            '/recipes',
            { id: categoryId, category: category },
        ]);
    }
    // @HostListener('window:scroll')
    // onWindowScroll() {
    //     const scrollOffset = 70;
    //     this.isFixed =
    //         (window.pageYOffset ||
    //             document.documentElement.scrollTop ||
    //             document.body.scrollTop ||
    //             0) > scrollOffset;
    // }
}
