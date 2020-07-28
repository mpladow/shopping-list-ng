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
    methodItems: Array<MethodItem> = [];
    ingredients: Array<Ingredient> = [];
}



// Model for the list view of recipes
export class RecipeListVM {
    recipeId: number = 0;
    name: string = '';
    descriptionPrimary: string = '';
    imageUrl: string = '';
}
