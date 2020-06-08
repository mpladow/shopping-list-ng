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
import { RecipeListComponent } from './main-components/recipe-list/recipe-list.component';
import { LoginComponent } from './login-components/login/login.component';
import { RegisterComponent } from './login-components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    NavbarBottomComponent,
    HeaderComponent,
    RecipeListComponent,
    LoginComponent,
    RegisterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
