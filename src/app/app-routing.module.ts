import { RegisterComponent } from './login-components/register/register.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './main-components/shopping-list/shopping-list.component';
import { RecipeListComponent } from './main-components/recipe-list/recipe-list.component';
import { LoginComponent } from './login-components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

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
    { path: '**', redirectTo: '/shopping-list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
