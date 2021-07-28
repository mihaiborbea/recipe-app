import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeForm: FormGroup;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = this.editMode
      ? this.recipeService.getRecipe(this.id).name
      : '';
    let recipeImagePath = this.editMode
      ? this.recipeService.getRecipe(this.id).imagePath
      : '';
    let recipeDescription = this.editMode
      ? this.recipeService.getRecipe(this.id).description
      : '';
    let recipeIngredients =
      this.editMode && this.recipeService.getRecipe(this.id).ingredients
        ? new FormArray(
            this.recipeService.getRecipe(this.id).ingredients.map(
              (i) =>
                new FormGroup({
                  name: new FormControl(i.name, Validators.required),
                  amount: new FormControl(i.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
            )
          )
        : new FormArray([]);

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe({
        id: this.id,
        ...this.recipeForm.value,
      });
    } else {
      const newRecipe = new Recipe(
        this.recipeService.getRecipes().length + 1,
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients']
      );
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
