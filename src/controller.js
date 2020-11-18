const { default: Axios } = require('axios');

module.exports = {
    async getRecipes(req, res) {
        const ingredients = req.params.i;
        let ingArray = ingredients.split(',').sort();

        if (ingArray.length > 3) {
            return res.json({ "error": 'Maximum ingredients number is 3.' });
        }

        try {
            const recipes = (await Axios.get(`http://www.recipepuppy.com/api/?i=${ingredients}`)).data.results;

            const response = {
                "keywords": ingArray,
                "recipes": []
            };

            for (recipe of recipes) {
                const recipeObj = await mountRecipeObj(recipe);
                response.recipes.push(recipeObj);
            }

            return res.json(response);

        } catch (error) {
            if (error.response.status === 500) {
                return res.json({ "error": 'No recipe found with those ingredients: ' + ingredients });
            }
        }
    },

    async mountRecipeObj(recipe) {
        const gifSearchQuery = recipe.title.replace(' ', '+');

        const recipeObj = {
            "title": recipe.title,
            "ingredients": recipe.ingredients,
            "link": recipe.href,
            "gif": this.getGif(gifSearchQuery)
        };
        return recipeObj;
    },

    async getGif(gifSearchQuery) {
        return (await Axios.get(`http://api.giphy.com/v1/gifs/search?q=${gifSearchQuery}&api_key=pPiMNFkdnBt4wGmBiJ9YCryAw3lHJk98&limit=1`)).data.data[0].url;
    }
};