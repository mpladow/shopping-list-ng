import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CategoryService } from 'src/app/services/category.service';
import { AdminrecipesService } from 'src/app/services/adminrecipes.service';
import { Recipe } from 'src/app/models/recipe';

import { ImageCropperModule, ImageCroppedEvent } from 'ngx-image-cropper';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    selector: 'app-admin-recipe-edit',
    templateUrl: './admin-recipe-edit.component.html',
    styleUrls: ['./admin-recipe-edit.component.scss'],
})
export class AdminRecipeEditComponent implements OnInit {
    currentImage: string | ArrayBuffer = null;
    public reorderingIngredients: boolean = false;
    public reorderingMethodItems: boolean = false;
    public drpdownCategories: Category[] = [];
    public recipeForm: FormGroup;
    public loading = false;

    // Image cropper
    imageChangedEvent: any = '';
    croppedImage: any = '';

    constructor(
        private categoryService: CategoryService,
        private adminrecipesService: AdminrecipesService,
        private fb: FormBuilder,
        private alertify: AlertifyService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    public id: number = 0;

    ngOnInit() {
        // get categories
        this.loading = true;
        window.scrollTo(0, 0);
        this.id = this.route.snapshot.params['id'];
        this.createRecipeForm();
        this.categoryService
            .getCategories()
            .subscribe((categories: Category[]) => {
                this.drpdownCategories = categories;
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

                    // add display image by setting this to the currentImage var
                    if (recipe.imageFile != null) {
                        let src = 'data:image/jpeg;base64,';
                        src += recipe.imageFile;
                        this.currentImage = src;
                    }
                    // sort ingredients and methoditems
                    recipe.methodItems.sort((a, b) => {
                        return a.stepNo - b.stepNo;
                    });
                    recipe.ingredients.sort((a, b) => {
                        return a.positionNo - b.positionNo;
                    });
                    this.loading = false;
                });
        } else {
            this.loading = false;
        }
        console.log(this.currentImage);
    } 
    // ERROR HANDLING
    public hasError = (controlName: string, errorName: string) => {
        const form = this.recipeForm.controls[controlName];
        return form.hasError(errorName);
    }
    public hasArrayError = (index: number, controlName: string, fieldName: string,  errorName: string, ) => {
        const formArray = <FormArray>this.recipeForm.get(fieldName);
        const control = formArray.controls[index].get(controlName);
        return control.hasError(errorName);
    }
      
    createRecipeForm() {
        this.recipeForm = this.fb.group({
            recipeId: 0,
            name: ['', Validators.required],
            categoryId: ['', Validators.required],
            imageFile: '',
            descriptionPrimary: ['', Validators.required],
            descriptionSecondary: '',
            ingredients: new FormArray([this.createIngredientsForm()]),
            methodItems: new FormArray([this.createMethodsForm()]),
        });
    }
    createIngredientsForm(isSeperator: boolean = false) {
        return this.fb.group({
            ingredientId: 0,
            name: ['', Validators.required],
            measure: '',
            quantity: '',
            positionNo: '',
            seperator: isSeperator,
        });
    }
    getIngredientsForm(form) {
        return form.controls.ingredients.controls;
    }
    addIngredientToForm(isSeperator: boolean = false) {
        const control = <FormArray>this.recipeForm.get('ingredients');
        control.push(this.createIngredientsForm(isSeperator));

    }
    removeIngredientFromForm(i) {
        const control = <FormArray>this.recipeForm.get('ingredients');
        control.removeAt(i);
    }
    toggleReorderIngredients() {
        this.reorderingIngredients = !this.reorderingIngredients;
    }
    createMethodsForm(isSeperator: boolean = false) {
        return this.fb.group({
            methodItemId: 0,
            stepNo: 0,
            text: ['', Validators.required],
            seperator: isSeperator,
        });
    }

    addMethodItemToForm(seperator: boolean = false) {
        const control = <FormArray>this.recipeForm.get('methodItems');
        control.push(this.createMethodsForm(seperator));
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
        // CHECK that this form is valid first
        if (this.recipeForm.valid) {
            this.alertify.confirm(
                'Save this recipe',
                'Do you want to save this recipe?',
                () => {
                    this.adminrecipesService
                        .createNewRecipe(recipe)
                        .subscribe((newRecipeId: number) => {
                            if (newRecipeId > 0) {
                                this.alertify.success(
                                    `Your recipe (${recipe.name}) has been saved.`
                                    );
                                    this.router.navigate(['/admin-recipe-edit', {id: newRecipeId}]);
                                    window.scrollTo(0, 0);
                                this.recipeForm
                                    .get('recipeId')
                                    .setValue(newRecipeId);
                            } else {
                                this.alertify.warning(
                                    'Your recipe could not be saved at the current moment. Please try again'
                                );
                            }
                            console.log(newRecipeId);
                        });
                }
            );
        }
    }
    delete() {
        const id = this.recipeForm.get('recipeId').value;

        if (id > 0) {
            this.alertify.confirm(
                'Delete this recipe',
                'Are you sure you want to delete this recipe?',
                () => {
                    this.adminrecipesService
                        .deleteRecipeById(id)
                        .subscribe((result) => {
                            if (result) {
                                this.alertify.success(
                                    `Your recipe has been deleted.`
                                );
                                // reset all form data
                                this.recipeForm.reset();
                                this.recipeForm.get('recipeId').setValue('0');
                                const ingredients = <FormArray>(
                                    this.recipeForm.get('ingredients')
                                );
                                for (
                                    let index = 0;
                                    index < ingredients.length;
                                    index++
                                ) {
                                    ingredients.removeAt(index);
                                }
                                this.addIngredientToForm();
                                const methodItems = <FormArray>(
                                    this.recipeForm.get('methodItems')
                                );
                                for (
                                    let index = 0;
                                    index < methodItems.length;
                                    index++
                                ) {
                                    methodItems.removeAt(index);
                                }
                                this.addMethodItemToForm();
                            }
                        });
                }
            );
        }
    }
    clear() {
        this.alertify.confirm(
            'Clear all',
            'Are you sure you want to clear all data?',
            () => {
                this.recipeForm.reset();
                this.recipeForm.get('recipeId').setValue('0');
                const ingredients = <FormArray>(
                    this.recipeForm.get('ingredients')
                );
                for (let index = 0; index < ingredients.length; index++) {
                    ingredients.removeAt(index);
                }
                this.addIngredientToForm();
                const methodItems = <FormArray>(
                    this.recipeForm.get('methodItems')
                );
                for (let index = 0; index < methodItems.length; index++) {
                    methodItems.removeAt(index);
                }
                this.addMethodItemToForm();
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
    // onFileSelected(event) {
    //     // we want to convert this file to a base64 so we can display this.
    //     const reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]); // read file as data url

    //     reader.onload = (e) => {
    //         // called once readAsDataURL is completed
    //         this.currentImage = e.target.result;
    //         console.log(e.target.result);
    //         this.recipeForm.controls['imageFile'].setValue(e.target.result);
    //     };
    // }

    onFileSelected(event: ImageCroppedEvent) {
        this.imageChangedEvent = event;
    }

    imageCropped(event: any): void {
        const base64 = event.base64;
        this.currentImage = base64;
        this.recipeForm.controls['imageFile'].setValue(base64);
    }

    onImageUploadClick() {}
    removeImage() {
        this.recipeForm.controls['imageFile'].setValue('');
        this.currentImage = null;
    }
}
