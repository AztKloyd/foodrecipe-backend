const express=require("express")
const router=express.Router()
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload} = require("../controller/recipe")
const verifyToken = require("../middleware/auth")

router.post("/", verifyToken, upload.single("file"), addRecipe);
router.put("/:id", verifyToken, upload.single("file"), editRecipe);
router.get("/",getRecipes) //Get all recipes
router.get("/:id",getRecipe) //Get recipe by id
router.delete("/:id",deleteRecipe) //Delete recipe

module.exports=router;