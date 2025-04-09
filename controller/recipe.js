const Recipes = require("../models/recipe")
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes = async (req, res) => {
  const recipes = await Recipes.find()
  return res.json(recipes)
}

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id)
  res.json(recipe)
}

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    const parsedIngredients =
      typeof ingredients === 'string' ? ingredients.split(',') : ingredients;

    if (!title || !parsedIngredients || !instructions) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file not uploaded" });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients: parsedIngredients,
      instructions,
      time,
      coverImage: req.file.filename,
      createdBy: req.user?.id ?? "unknown"
    });

    res.json(newRecipe);
  } catch (err) {
    console.error("Add recipe error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body
  let recipe = await Recipes.findById(req.params.id)

  try {
    if (recipe) {
      let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage
      await Recipes.findByIdAndUpdate(
        req.params.id,
        {
          title,
          ingredients: typeof ingredients === 'string' ? ingredients.split(',') : ingredients,
          instructions,
          time,
          coverImage
        },
        { new: true }
      )
      res.json({ title, ingredients, instructions, time })
    }
  } catch (err) {
    return res.status(404).json({ message: err })
  }
}

const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({ _id: req.params.id })
    res.json({ status: "ok" })
  } catch (err) {
    return res.status(400).json({ message: "error" })
  }
}

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload }