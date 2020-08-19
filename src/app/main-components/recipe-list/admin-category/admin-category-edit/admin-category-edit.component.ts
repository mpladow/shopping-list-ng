import { AlertifyService } from './../../../../services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'app-admin-category-edit',
    templateUrl: './admin-category-edit.component.html',
    styleUrls: ['./admin-category-edit.component.scss'],
})
export class AdminCategoryEditComponent implements OnInit {
    id: number = 0;
    currentImage: string | ArrayBuffer = null;
    public categoryForm: FormGroup;

    // Image cropper
    imageChangedEvent: any = '';
    croppedImage: any = '';
    
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private alertify: AlertifyService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.createCategoryForm(); // create the form
        // patch the existing details if id > 0
        if (this.id > 0) {
            this.categoryService
                .getCategoryById(this.id)
                .subscribe((category) => {
                    this.categoryForm.patchValue(category);
                    // add display image by setting this to the currentImage var
                    if (category.imageBase64 != null) {
                        let src = 'data:image/jpeg;base64,';
                        src += category.imageBase64;
                        this.currentImage = src;
                    }
                });
        }
    }

    createCategoryForm() {
        this.categoryForm = this.fb.group({
            categoryId: '',
            name: ['', Validators.required],
            imageBase64: '',
            order: 0,
            description: '',
        });
    }
    //image cropper
    onFileSelected(event: ImageCroppedEvent) {
        this.imageChangedEvent = event;
    }

    imageCropped(event: any): void {
        const base64 = event.base64;
        this.currentImage = base64;
        this.categoryForm.controls['imageBase64'].setValue(base64);
    }

    onImageUploadClick() {}
    removeImage() {
        this.categoryForm.controls['imageBase64'].setValue('');
        this.currentImage = null;
    }

    delete() {}
    submit() {
       const category: Category = this.categoryForm.value;
       this.alertify.confirm(
           'Save this recipe',
           'Do you want to save this recipe?',
           () => {
               this.categoryService
                   .createNewCategory(category)
                   .subscribe((categoryId: number) => {
                       if (categoryId > 0) {
                           this.alertify.success(
                               `Your category (${category.name}) has been saved.`
                           );
                           this.categoryForm
                               .get('recipeId')
                               .setValue(categoryId);
                       } else {
                           this.alertify.warning(
                               'Your category could not be saved at the current moment. Please try again'
                           );
                       }
                   });
           }
       );
    }
    clear() {}
}
