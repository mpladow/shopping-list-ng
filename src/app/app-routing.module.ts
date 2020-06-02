import { RegisterComponent } from './login-components/register/register.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './login-components/shopping-list/shopping-list.component';
import { RecipeListComponent } from './login-components/recipe-list/recipe-list.component';
import { LoginComponent } from './login-components/login/login.component';

const routes: Routes = [
  { path: "", component: ShoppingListComponent },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "recipe-list", component: RecipeListComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
