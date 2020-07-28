import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CategoryService } from 'src/app/services/category.service';
import { AdminrecipesService } from 'src/app/services/adminrecipes.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
    selector: 'app-admin-recipe-edit',
    templateUrl: './admin-recipe-edit.component.html',
    styleUrls: ['./admin-recipe-edit.component.scss'],
})
export class AdminRecipeEditComponent implements OnInit {
    public drpdownCategories: Category[] = [];
    public recipeForm: FormGroup;
    constructor(
        private categoryService: CategoryService,
        private adminrecipesService: AdminrecipesService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        // get categories
        this.createRecipeForm();
        this.categoryService
            .getCategories()

            .subscribe((categories: Category[]) => {
                this.drpdownCategories = categories;
                console.log(categories);
            });
    }
    createRecipeForm() {
        this.recipeForm = this.fb.group({
            name: '',
            categoryId: '',
            descriptionPrimary: '',
            descriptionSecondary: '',
            ingredients: new FormArray([this.createIngredientsForm()]),
            methodItems: new FormArray([this.createMethodsForm()]),
        });
    }
    createIngredientsForm() {
        return this.fb.group({
            ingredientId: '',
            name: '',
            measure: '',
            quantity: '',
            positionNo: '',
        });
    }
    getIngredientsForm(form) {
        return form.controls.ingredients.controls;
    }
    addIngredientToForm() {
        const control = <FormArray>this.recipeForm.get('ingredients');
        control.push(this.createIngredientsForm());
    }
    removeIngredientFromForm(i) {
        const control = <FormArray>this.recipeForm.get('ingredients');
        control.removeAt(i);
    }
    createMethodsForm() {
        return this.fb.group({
            methodItemId: '',
            stepNo: '',
            text: '',
        });
    }
    addMethodItemToForm() {
        const control = <FormArray>this.recipeForm.get('methodItems');
        control.push(this.createMethodsForm());
    }
    removeMethodItemFromFrom(i) {
        const control = <FormArray>this.recipeForm.get('methodItems');
        control.removeAt(i);
    }
    getMethodsForm(form) {
        return form.controls.methodItems.controls;
    }
    submit() {
        console.log(this.recipeForm);
        let recipe: Recipe = this.recipeForm.value;
        this.adminrecipesService.createNewRecipe(recipe).subscribe((result:any) => {
            let xx = result;
            console.log(result);
        });
    }
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            this.getMethodsForm(this.recipeForm),
            event.previousIndex,
            event.currentIndex
        );
    }
}
