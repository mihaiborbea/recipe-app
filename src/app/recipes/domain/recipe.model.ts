import { Ingredient } from '../../shared/domain/ingredient.model';

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
    public createdBy: string
  ) {}
}

export const recipeConverter = {
  toFirestore: (recipe: Recipe) => {
    return {
      name: recipe.name,
      description: recipe.description,
      imagePath: recipe.imagePath,
      ingredients: recipe.ingredients.map((i) => ({ ...i })),
      createdBy: recipe.createdBy,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Recipe(
      snapshot.id,
      data.name,
      data.description,
      data.imagePath,
      data.ingredients.map((i) => new Ingredient(i.name, i.amount)),
      data.createdBy
    );
  },
};
