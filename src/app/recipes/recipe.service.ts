import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!😉',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Wiener-Schnitzel02.jpg/1200px-Wiener-Schnitzel02.jpg',
      [
        new Ingredient('Meat(g)', 350),
        new Ingredient('French Fries(6)', 100)
      ]),
    new Recipe(
      'Pizza',
      'Italian cheese pizza',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190226-buffalo-chicken-pizza-370-1552084943.jpg',
      [
        new Ingredient('Flour(g)', 1000),
        new Ingredient('Meat(g)', 250),
        new Ingredient('Cheese(package)', 1),
        new Ingredient('Pepperoni(package)', 1),
        new Ingredient('Tomato Sauce(package)', 1),
        new Ingredient('Red Pepper(g)', 200),
        new Ingredient('Yellow Pepper(g)', 200),
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?😋',
      'https://www.foodrepublic.com/wp-content/uploads/2012/03/033_FR11785.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat(g)', 250),
        new Ingredient('Cheese(package)', 1),
      ]),
    new Recipe(
      'Korean Sea food fried rice',
      'Taste the real fried rice😋',
      'https://img.taste.com.au/_Cn_i0k4/taste/2016/11/korean-fried-rice-110237-1.jpeg',
      [
        new Ingredient('Rice(g)', 500),
        new Ingredient('Crab(g)', 250),
        new Ingredient('Shrimp(g)', 250),
        new Ingredient('Egg', 3),
        new Ingredient('Soy Sauce(ml)', 100),
        new Ingredient('Mint Leaves(g)', 100),
        new Ingredient('Oil(ml)', 50),
      ])
  ];

  constructor(private slService: ShoppingListService) { }

  // tslint:disable-next-line:typedef
  getRecipes() {
    return this.recipes.slice();
  }

  // tslint:disable-next-line:typedef
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
