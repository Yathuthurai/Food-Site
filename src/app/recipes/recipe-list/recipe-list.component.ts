import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Pasta', 'Italian testing pasta', 'https://www.eatwell101.com/wp-content/uploads/2017/11/sausage-and-pasta-recipes-for-dinner.jpg'),
    new Recipe('Pizza', 'Italian cheese pizza', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190226-buffalo-chicken-pizza-370-1552084943.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
