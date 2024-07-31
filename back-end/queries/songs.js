const getRecipe = async (id) => {
  try {
    const oneRecipe = await db.one("SELECT * FROM recipes WHERE id=$1", id);
    return oneRecipe;
  } catch (error) {
    return error;
  }
};
