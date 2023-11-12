import { FileUpload } from '../../shared/domain/fileupload.model';
import { Ingredient } from '../../shared/domain/ingredient.model';

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public image: FileUpload,
    public ingredients: Ingredient[],
    public createdBy: string
  ) {}
}

export const recipeConverter = {
  toFirestore: (recipe: Recipe) => {
    const allowedImage = { ...recipe.image };
    delete allowedImage.file;
    return {
      name: recipe.name,
      description: recipe.description,
      image: allowedImage,
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
      new FileUpload(data.image.name, data.image.url, null),
      data.ingredients.map((i) => new Ingredient(i.name, i.amount)),
      data.createdBy
    );
  },
};
