import { RecipesService } from './../../../services/recipes.service';
import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    SimpleChange,
    OnChanges,
} from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-all-recipes',
    templateUrl: './all-recipes.component.html',
    styleUrls: ['./all-recipes.component.scss'],
})
export class AllRecipesComponent implements OnInit, OnChanges {
    recipes: Recipe[] = [];
    @Input() query: string = '';
    @Input() event: Event;

    // @Output()
    // public onData: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private recipeService: RecipesService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // get top 20 recipes
        // we need to get input
        this.getRecipesByQuery();
    }
    ngOnChanges() {
        this.getRecipesByQuery();
    }
    onRecipeClick(recipeId) {
        this.router.navigate(['/recipe', { id: recipeId }]);
    }
    onClickTEST() {
        console.log({ data: this.query });
    }
    getRecipesByQuery() {
        this.recipeService.GetRecipesByQuery(this.query).subscribe((data) => {
            this.recipes = data;
            this.recipes.forEach((r) => {
                if (r.imageFile != null) {
                    r.imageSrc = r.imageFile;
                }
            });
        });
    }
}
