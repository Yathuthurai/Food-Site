import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('warm water (ml)', 355),
    new Ingredient('active dry yeast (teaspoons)', 2.25),
    new Ingredient('olive oil (ml)', 50),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onIngredientAdded(ingredient: Ingredient) {
     this.ingredients.push(ingredient);
  }

}
