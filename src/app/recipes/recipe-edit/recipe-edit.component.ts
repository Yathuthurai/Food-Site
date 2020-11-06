import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.recipeForm);
  }

  // tslint:disable-next-line:typedef
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      // ingredients: recipeIngredients,
    });
  }
}

// // tslint:disable-next-line:typedef
// private initForm() {
//   let recipeName: '';
//   let recipeImagePath: '';
//   let recipeDescription: '';
//   if (this.editMode) {
//     const recipe = this.recipeService.getRecipe(this.id);
//     recipeName = recipe.name;
//     // tslint:disable-next-line:no-unused-expression
//     recipeImagePath: recipe.imagePath;
//     // tslint:disable-next-line:no-unused-expression
//     recipeDescription: recipe.description;
//   }
//   this.recipeForm = new FormGroup({
//     // tslint:disable-next-line:object-literal-key-quotes
//     'name': new FormControl(recipeName),
//     // tslint:disable-next-line:object-literal-key-quotes
//     'imagePath': new FormControl(recipeImagePath),
//     // tslint:disable-next-line:object-literal-key-quotes
//     'imageDescription': new FormControl(recipeDescription),
//   });
// }
