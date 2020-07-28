import { Category } from './category';

export class MethodItem {
    public constructor(init?: Partial<MethodItem>) {
        Object.assign(this, init);
    }
    methodItemId: number = 0;
    stepNo: string = '';
    text: string = '';
}
