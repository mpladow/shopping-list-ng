export class Category {
    categoryId: number = 0;
    name: string = '';
    description: string = '';
    imageUrl = '';
    imageBase64: string = '';
    imageSrc: string = '';
    imageFile: string;
    image: File;
    order: number = 0;
}

export class CategoryVM {
    categoryId: number = 0;
    name: string = '';
    description: string = '';
    imageUrl: string = '';
    imageFile: string = '';
    imageSrc: string = '';
    imageBase64: string = '';
    image: File;
    order: number = 0;
}