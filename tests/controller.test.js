const controller = require('../src/controller');
const { default: axios } = require('axios');

const mountRecipeObjRequest = {"title": "Creamy Scrambled Eggs Recipe Recipe","href": "http://www.grouprecipes.com/43522/creamy-scrambled-eggs-recipe.html","ingredients": "onions","thumbnail": "http://img.recipepuppy.com/373064.jpg"};
const mountRecipeObjResponse = {"title":"Creamy Scrambled Eggs Recipe Recipe","ingredients":["onions"],"link":"http://www.grouprecipes.com/43522/creamy-scrambled-eggs-recipe.html","gif":"https://giphy.com/gifs/rice-fried-leftover-Aj9EHGocwb4bu"};
const getGifRequest = "Creamy+Scrambled+Eggs+Recipe+Recipe";
const getGifResponse = "https://giphy.com/gifs/rice-fried-leftover-Aj9EHGocwb4bu";

test('mount creamy scrambled eggs recipe object', ()=>{
    expect(controller.mountRecipeObj(mountRecipeObjRequest)).resolves.toBe(mountRecipeObjResponse)
});

test('get creamy scrambled eggs gif', ()=>{
    expect(controller.getGif(getGifRequest)).resolves.toBe(getGifResponse)
});