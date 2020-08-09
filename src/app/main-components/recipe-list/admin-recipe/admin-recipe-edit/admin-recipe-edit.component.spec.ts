import { AdminRecipeEditComponent } from './admin-recipe-edit.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('RecipeEditComponent', () => {
  let component: AdminRecipeEditComponent;
  let fixture: ComponentFixture<AdminRecipeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [AdminRecipeEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
