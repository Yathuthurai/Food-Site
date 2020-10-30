import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('warm water (ml)', 355),
    new Ingredient('active dry yeast (teaspoons)', 2.25),
    new Ingredient('olive oil (ml)', 50),
  ];

  constructor() { }

  // tslint:disable-next-line:typedef
  getIngredients() {
    return this.ingredients.slice();
  }

  // tslint:disable-next-line:typedef
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
