import { TestBed } from '@angular/core/testing';

import { AdminrecipesService } from './adminrecipes.service';

describe('AdminrecipesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminrecipesService = TestBed.get(AdminrecipesService);
    expect(service).toBeTruthy();
  });
});
