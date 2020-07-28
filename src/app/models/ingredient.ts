import { Category } from './category';

export class Ingredient {
    public constructor(init?: Partial<Ingredient>) {
        Object.assign(this, init);
    }
    ingredientId: number = 0;
    quantity: number = 0;
    measurement: string = '';
    name: string = '';
    positionNo: string = '';
}
