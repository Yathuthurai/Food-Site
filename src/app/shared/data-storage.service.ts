import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://foodsiteangular.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  // tslint:disable-next-line:typedef
  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://foodsiteangular.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap(data => {
          this.recipeService.setRecipes(data);
        })
      );
  }
}
