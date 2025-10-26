import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    // Loading recipe
    await model.loadRecipe(id);
    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// Loading recipes
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, controlRecipes));
