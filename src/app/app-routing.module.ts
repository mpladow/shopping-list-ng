
import { RecipesComponent } from './main-components/recipes/recipes.component';
import { AdminRecipeEditComponent } from './main-components/recipe-list/admin-recipe/admin-recipe-edit/admin-recipe-edit.component';
import { RegisterComponent } from './login-components/register/register.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './main-components/shopping-list/shopping-list.component';
import { RecipeListComponent } from './main-components/recipe-list/recipe-list.component';
import { LoginComponent } from './login-components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { RecipeComponent } from './main-components/recipe-list/recipe/recipe.component';
import { AdminCategoryListComponent } from './main-components/recipe-list/admin-category/admin-category-list/admin-category-list.component';
import { AdminCategoryEditComponent } from './main-components/recipe-list/admin-category/admin-category-edit/admin-category-edit.component';

const routes: Routes = [
    { path: '', component: ShoppingListComponent, canActivate: [AuthGuard] },
    {
        path: 'shopping-list',
        component: ShoppingListComponent,
        canActivate: [AuthGuard],
    },
    // {
    //     // this is a dummy route used to protect multiple routes
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: [
    //         {
    //             path: 'recipe-list',
    //             component: RecipeListComponent,
    //         },
    //         {
    //             path: 'shopping-list',
    //             component: ShoppingListComponent,
    //         },
    //     ],
    // },
    {
        path: 'recipe-list',
        component: RecipeListComponent,
        canActivate: [AuthGuard],
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recipe', component: RecipeComponent },

    { path: 'recipe/:id', component: RecipeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipes/:id:category', component: RecipesComponent },
    { path: 'admin-recipe-edit/:id', component: AdminRecipeEditComponent },
    { path: 'admin-recipe-edit', component: AdminRecipeEditComponent },

    { path: 'admin-category-list', component: AdminCategoryListComponent },
    { path: 'admin-category-edit', component: AdminCategoryEditComponent },

    { path: '**', redirectTo: '/shopping-list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
