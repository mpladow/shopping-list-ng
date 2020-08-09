import { Category } from './category';
import { MethodItem } from './methodItem';
import { Ingredient } from './ingredient';

export class Recipe {
    recipeId: number = 0;
    name: string = '';
    descriptionPrimary: string = '';
    descriptionSecondary: string = '';
    imageUrl: string = '';
    deletedAt: string = '';
    publishedAt: string = '';
    categoryId: number = 0;
    category: Category;
    categoryName: string = '';
    methodItems: Array<MethodItem> = [];
    ingredients: Array<Ingredient> = [];
}

export class RecipeVM {
    recipeId: number = 0;
    name: string = '';
    categoryName: string = '';
    publishedAt: string = '';
}

// Model for the list view of recipes
export class RecipeListVM {
    recipeId: number = 0;
    name: string = '';
    descriptionPrimary: string = '';
    imageUrl: string = '';
}
