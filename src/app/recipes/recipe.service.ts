import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Pasta', 'Italian testing pasta', 'https://www.eatwell101.com/wp-content/uploads/2017/11/sausage-and-pasta-recipes-for-dinner.jpg'),
    new Recipe('Pizza', 'Italian cheese pizza', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190226-buffalo-chicken-pizza-370-1552084943.jpg'),
    new Recipe('Burger', 'Double cheese chicken burger', 'https://www.saputo.ca/en/recipes/url(/-/media/ecosystem/divisions/canada-dairy/sites/saputo-ca/saputo-ca-images/recipes/hero/_mobile_images/hero_beef_and_asiago_burger_mobile.ashx?revision=8029944e-f76d-4b80-b0b9-c2b02afe5b8d)')
  ];

  constructor() { }

  // tslint:disable-next-line:typedef
  getRecipes() {
    return this.recipes.slice();
  }
}
