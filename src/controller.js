const { default: Axios } = require('axios');

require('axios');

module.exports = {
    async getRecipes(req, res) {
        const ingredients = req.params.i;
        let gifSearchQuery;
        let ingArray = ingredients.split(',').sort();

        if(ingArray.length > 3){
            return res.json({"error":'Maximum ingredients number is 3.'});
        }

        try{
            const recipes = (await Axios.get(`http://www.recipepuppy.com/api/?i=${ingredients}`)).data.results;
            
            const response = {
                "keywords" : ingArray,
                "recipes" : []
            };

            for(recipe of recipes){
                gifSearchQuery = recipe.title.replace(' ', '+');

                const recipeObj = {
                    "title": recipe.title,
                    "ingredients": recipe.ingredients,
                    "link": recipe.href,
                    "gif": (await Axios.get(`http://api.giphy.com/v1/gifs/search?q=${gifSearchQuery}&api_key=pPiMNFkdnBt4wGmBiJ9YCryAw3lHJk98&limit=1`)).data.data[0].url,
                };

                response.recipes.push(recipeObj);
            }
                
            return res.json(response);
        }catch(error){
            if(error.response.status === 500){
                return res.json({"error":'No recipe found with those ingredients: ' + ingredients});
            } 
        }
    },
}