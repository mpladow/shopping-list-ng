import { LoadingScreenInterceptor } from './interceptors/loading-screen.interceptor';
import { CachingInterceptor } from './interceptors/caching/caching.interceptor';
import { RequestCacheService } from './services/request-cache.service';
import { RecipesComponent } from './main-components/recipes/recipes.component';
import { AdminRecipeEditComponent } from './main-components/recipe-list/admin-recipe/admin-recipe-edit/admin-recipe-edit.component';
import { RecipesService } from './services/recipes.service';
import { AuthService } from './services/auth.service';
import { MaterialModule } from './shared/material-module.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarBottomComponent } from './shared/navbar-bottom/navbar-bottom.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './main-components/shopping-list/shopping-list.component';
import { RegisterComponent } from './login-components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipeComponent } from './main-components/recipe-list/recipe/recipe.component';
import { BackNavigationDirective } from './directives/back-navigation.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AdminCategoryListComponent } from './main-components/recipe-list/admin-category/admin-category-list/admin-category-list.component';
import { AdminCategoryEditComponent } from './main-components/recipe-list/admin-category/admin-category-edit/admin-category-edit.component';
import { SkeletonLoaderModule } from './shared/skeleton-loader/skeleton-loader.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainComponent } from './main-components/main/main.component';
import { SearchResultsComponent } from './main-components/search-results/search-results.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { CategoriesComponent } from './main-components/recipe-list/categories/categories.component';
import { LoginComponent } from './login-components/login/login.component';
import { AllRecipesComponent } from './main-components/recipe-list/all-recipes/all-recipes.component';
import { MainJumbotronComponent } from './main-components/recipe-list/main-jumbotron/main-jumbotron.component';



@NgModule({
    declarations: [
        AppComponent,
        ShoppingListComponent,
        NavbarBottomComponent,
        HeaderComponent,
        CategoriesComponent,
        LoginComponent,
        RegisterComponent,
        RecipeComponent,
        RecipesComponent,
        AdminRecipeEditComponent,
        BackNavigationDirective,
        AdminCategoryListComponent,
        AdminCategoryEditComponent,
        MainComponent,
        SearchResultsComponent,
        LoadingComponent,
        AllRecipesComponent,
        MainJumbotronComponent
          ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule,
        ImageCropperModule,
        SkeletonLoaderModule,
    ],
    providers: [
        AuthService,
        RecipesService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        RequestCacheService, 
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
