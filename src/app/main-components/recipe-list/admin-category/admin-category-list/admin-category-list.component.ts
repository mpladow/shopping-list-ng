import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-admin-category-list',
    templateUrl: './admin-category-list.component.html',
    styleUrls: ['./admin-category-list.component.scss'],
})
export class AdminCategoryListComponent implements OnInit {
    categories: Category[] = [];
    reorderingCategories: boolean = false;
    public categoryForm: FormGroup;

    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private alertify: AlertifyService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.categoryForm = this.fb.group({
            categories: new FormArray([]),
        });
        console.log('init');
        this.categoryService.getCategories().subscribe((categories) => {
            console.log(categories);
            categories.forEach((c) => {
                this.addCategoryToForm();
                if (c.imageBase64 != null) {
                    c.imageSrc = c.imageBase64;
                }
            });
            this.categoryForm.get('categories').patchValue(categories);
        });
    }

    dropCategory(event: CdkDragDrop<string[]>) {
        const categoryFormArray = this.categoryForm.get('categories') as FormArray;
        this.moveItemInFormArray(
            categoryFormArray,
            event.previousIndex,
            event.currentIndex
        );
        console.log({ 'form': this.categoryForm.value });
        this.categoryService
            .reorderCategories(this.categoryForm.value)
            .subscribe((response) => {
                console.log(response);
            });
    }
    addCategoryForm() {
        return this.fb.group({
            categoryId: 0,
            name: '',
            order: 0,
            imageSrc: '',
        });
    }
    addCategoryToForm() {
        const control = <FormArray>this.categoryForm.get('categories');
        control.push(this.addCategoryForm());
    }
    getCategories(form) {
        return form.controls.categories.controls;
    }
    moveItemInFormArray(
        formArray: FormArray,
        fromIndex: number,
        toIndex: number
    ): void {
        const dir = toIndex > fromIndex ? 1 : -1;

        const from = fromIndex;
        const to = toIndex;

        let newIndex: number = from + dir;
        if (newIndex === -1) {
            newIndex = formArray.length - 1;
        } else if (newIndex === formArray.length) {
            newIndex = 0;
        }

        const currentGroup = formArray.at(from);
        formArray.removeAt(from);
        formArray.insert(to, currentGroup);
    }
    onEditClick(e) {
        console.log(e);
        this.router.navigate(['/admin-category-edit', { id: e }]);
    }
    onNewItem() {
        this.router.navigate(['/admin-category-edit', { id: 0 }]);
    }
}
