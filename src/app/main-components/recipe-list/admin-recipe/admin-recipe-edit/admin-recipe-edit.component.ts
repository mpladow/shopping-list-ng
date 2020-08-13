import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

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
    selectedFile = null;
    currentImage: string | ArrayBuffer = null;
    public reorderingIngredients: boolean = false;
    public reorderingMethodItems: boolean = false;
    public drpdownCategories: Category[] = [];
    public recipeForm: FormGroup;
    constructor(
        private categoryService: CategoryService,
        private adminrecipesService: AdminrecipesService,
        private fb: FormBuilder,
        private alertify: AlertifyService,
        private route: ActivatedRoute
    ) {}
    public id: number = 0;

    ngOnInit() {
        // get categories
        this.id = this.route.snapshot.params['id'];
        this.createRecipeForm();
        this.categoryService
            .getCategories()

            .subscribe((categories: Category[]) => {
                this.drpdownCategories = categories;
                console.log(categories);
            });
        if (this.id > 0) {
            this.adminrecipesService
                .getRecipeById(this.id)
                .subscribe((recipe) => {
                    for (
                        let index = 0;
                        index < recipe.ingredients.length - 1;
                        index++
                    ) {
                        const element = recipe.ingredients[index];
                        this.addIngredientToForm();
                    }
                    for (
                        let index = 0;
                        index < recipe.methodItems.length - 1;
                        index++
                    ) {
                        const element = recipe.methodItems[index];
                        this.addMethodItemToForm();
                    }
                    this.recipeForm.patchValue(recipe);
                });
        }
        console.log(this.currentImage);
    }
    createRecipeForm() {
        this.recipeForm = this.fb.group({
            recipeId: 0,
            name: ['', Validators.required],
            categoryId: '',
            imageFile: '',
            descriptionPrimary: ['', Validators.required],
            descriptionSecondary: '',
            ingredients: new FormArray([this.createIngredientsForm()]),
            methodItems: new FormArray([this.createMethodsForm()]),
        });
    }
    createIngredientsForm() {
        return this.fb.group({
            ingredientId: 0,
            name: ['', Validators.required],
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
    toggleReorderIngredients() {
        this.reorderingIngredients = !this.reorderingIngredients;
    }
    createMethodsForm() {
        return this.fb.group({
            methodItemId: 0,
            stepNo: '',
            text: ['', Validators.required],
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
    toggleReorderMethodItems() {
        this.reorderingMethodItems = !this.reorderingMethodItems;
    }
    submit() {
        console.log(this.recipeForm);
        const recipe: Recipe = this.recipeForm.value;
        this.alertify.confirm(
            'Save this recipe',
            'Do you want to save this recipe?',
            () => {
                this.adminrecipesService
                    .createNewRecipe(recipe)
                    .subscribe((result: boolean) => {
                        if (result === true) {
                            this.alertify.success(
                                `Your recipe (${recipe.name}) has been saved.`
                            );
                        } else {
                            this.alertify.warning(
                                'Your recipe could not be saved at the current moment. Please try again'
                            );
                        }
                        let xx = result;
                        console.log(result);
                    });
            }
        );
    }
    dropMethodItem(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            this.getMethodsForm(this.recipeForm),
            event.previousIndex,
            event.currentIndex
        );
    }
    dropIngredient(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            this.getIngredientsForm(this.recipeForm),
            event.previousIndex,
            event.currentIndex
        );
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        // after uploaded, we want to display this image.
        let reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => {
            // called once readAsDataURL is completed
            this.currentImage = event.target.result;
            console.log(event.target.result);
            this.recipeForm.controls['imageFile'].setValue(event.target.result);
        };
    }
    onImageUploadClick() {}
    removeImage() {
        this.recipeForm.controls['imageFile'].setValue('');
        this.selectedFile = null;
        this.currentImage = null;
        console.log(this.selectedFile);
    }
}
