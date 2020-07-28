import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipeListComponent } from './admin-recipe-list.component';

describe('AdminRecipeListComponent', () => {
  let component: AdminRecipeListComponent;
  let fixture: ComponentFixture<AdminRecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRecipeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
