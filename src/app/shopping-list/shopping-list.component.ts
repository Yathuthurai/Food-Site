import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('warm water', '355 ml'),
    new Ingredient('active dry yeast', '2 1/4 teaspoons'),
    new Ingredient('olive oil', '50 ml'),
    new Ingredient('salt', '2 teaspoons'),
    new Ingredient('sugar', '1 teaspoons'),
    new Ingredient('Tomato sauce ', '1 package'),
    new Ingredient('Firm mozzarella cheese ', '1 package'),
    new Ingredient('Fontina cheese ', '1 package'),
    new Ingredient('Feta cheese ', '1 package'),
    new Ingredient('Mushrooms ', '200 g'),
    new Ingredient('Bell peppers ', '200 g'),
    new Ingredient('Pepperoni ', '150 g'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
