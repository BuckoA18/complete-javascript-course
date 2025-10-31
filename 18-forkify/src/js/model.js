import { API_URL } from "./config";
import { getJSON } from "./helpers";
import { RES_PER_PAGE } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPaage: RES_PER_PAGE,
  },
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    console.log(data);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const { resultsPerPaage } = state.search;

  const start = (page - 1) * resultsPerPaage; //0;
  const end = page * resultsPerPaage; //9;
  console.log(state.search.results.slice(start, end));
  return state.search.results.slice(start, end);
};
