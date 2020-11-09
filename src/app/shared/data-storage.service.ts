import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  // tslint:disable-next-line:typedef
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://foodsiteangular.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  // tslint:disable-next-line:typedef
  fetchRecipes() {
    return this.http.get<Recipe[]>('https://foodsiteangular.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}
