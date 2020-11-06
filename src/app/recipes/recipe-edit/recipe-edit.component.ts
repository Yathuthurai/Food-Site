import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
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

  // tslint:disable-next-line:typedef
  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

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
    // const newRecipe = new Recipe(
    //   this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imagePath,
    //   this.recipeForm.value.ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  // tslint:disable-next-line:typedef
  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  // tslint:disable-next-line:typedef
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // tslint:disable-next-line:typedef
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
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
