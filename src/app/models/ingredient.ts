import { Category } from './category';

export class Ingredient {
    public constructor(init?: Partial<Ingredient>) {
        Object.assign(this, init);
    }
    ingredientId: number = 0;
    quantity: number = 0;
    measure: string = '';
    name: string = '';
    positionNo: number = 0;
    seperator: boolean = false;
}
