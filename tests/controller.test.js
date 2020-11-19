/**
 * @jest-environment node
 */
const controller = require('../src/controller');
const server = require('../index')
const request = require('supertest');
const { default: axios } = require('axios');

const getRecipesGoodResponse = {"keywords":["onions"],"recipes":[{"title":"Creamy Scrambled Eggs Recipe Recipe","ingredients":["onions"],"link":"http://www.grouprecipes.com/43522/creamy-scrambled-eggs-recipe.html","gif":"https://giphy.com/gifs/rice-fried-leftover-Aj9EHGocwb4bu"},{"title":"Blue Ribbon Meatloaf","ingredients":["onions"],"link":"http://www.eatingwell.com/recipes/meatloaf.html","gif":"https://giphy.com/gifs/adweek-beer-pbr-ZNj8J78Da8BCU"},{"title":"Spaghetti with Clams & Corn","ingredients":["onions"],"link":"http://www.eatingwell.com/recipes/spaghetti_clams_corn.html","gif":"https://giphy.com/gifs/neve-campbell-ana-gasteyer-steven-weber-czIPBshOYCpRS"},{"title":"Green Bean Casserole","ingredients":["onions"],"link":"http://www.eatingwell.com/recipes/healthy_green_bean_casserole.html","gif":"https://giphy.com/gifs/stopmotion-6secfood-rokIerKIlxpZe"},{"title":"\nBroccoli Casserole Recipe\n\n","ingredients":["onions"],"link":"http://cookeatshare.com/recipes/broccoli-casserole-59082","gif":"https://giphy.com/gifs/dance-broccoli-3o7abzPdXjhsuX04z6"},{"title":"Crock Pot Caramelized Onions","ingredients":[" onions","butter"],"link":"http://www.recipezaar.com/Crock-Pot-Caramelized-Onions-191625","gif":"https://giphy.com/gifs/crock-pot-7IYPkpk7fiXaRt4yEp"},{"title":"Pulled Chicken Sandwiches (Crock Pot)","ingredients":[" onions","chicken"],"link":"http://www.recipezaar.com/Pulled-Chicken-Sandwiches-Crock-Pot-242547","gif":"https://giphy.com/gifs/crock-pot-7IYPkpk7fiXaRt4yEp"},{"title":"Grilled Chipotle Salmon With Pineapple Cilantro Rice","ingredients":[" onions","salmon"],"link":"http://www.recipezaar.com/Grilled-Chipotle-Salmon-With-Pineapple-Cilantro-Rice-128564","gif":"https://giphy.com/gifs/signs-chipotle-fKr0PLTe7lF8A"},{"title":"Roast Chicken with Rosemary","ingredients":[" salt","onions"],"link":"http://allrecipes.com/Recipe/Roast-Chicken-with-Rosemary/Detail.aspx","gif":"https://giphy.com/gifs/sunday-lunch-mum-ShZetsLxMZRTy"},{"title":"Boiled Ham","ingredients":[" onions","ham"],"link":"http://www.recipezaar.com/Boiled-Ham-11162","gif":"https://giphy.com/gifs/peteandpete-season-3-the-adventures-of-pete-and-l1AsJbZ1Q3iAPVrnq"}]};
const mountRecipeObjRequest = {"title": "Creamy Scrambled Eggs Recipe Recipe","href": "http://www.grouprecipes.com/43522/creamy-scrambled-eggs-recipe.html","ingredients": "onions","thumbnail": "http://img.recipepuppy.com/373064.jpg"};
const mountRecipeObjResponse = {"title":"Creamy Scrambled Eggs Recipe Recipe","ingredients":["onions"],"link":"http://www.grouprecipes.com/43522/creamy-scrambled-eggs-recipe.html","gif":"https://giphy.com/gifs/rice-fried-leftover-Aj9EHGocwb4bu"};
const getGifRequest = "Creamy+Scrambled+Eggs+Recipe+Recipe";

test('get recipes with onions', async () => {
    const res = await request(server).get('/recipes/onions');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(getRecipesGoodResponse)
});

test('get recipes with more than three ingredients', async () => {
    const res = await request(server).get('/recipes/onions,olives,garlic,bread');
    const expectedResponse = {"message":"Maximum ingredients number is 3."};
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedResponse)
});

test('get no existing recipes', async () => {
    const res = await request(server).get('/recipes/onions,olives');
    const expectedResponse = {"message":"No recipe found with those ingredients: onions,olives"};
    expect(res.status).toBe(500);
    expect(res.body).toEqual(expectedResponse)
});

test('mount creamy scrambled eggs recipe object', async ()=>{
    const res = await controller.mountRecipeObj(mountRecipeObjRequest)
    expect(res).toEqual(mountRecipeObjResponse)
});

test('get creamy scrambled eggs gif', async ()=>{
    const res = await controller.getGif(getGifRequest);
    const expectedResponse = "https://giphy.com/gifs/rice-fried-leftover-Aj9EHGocwb4bu";
    expect(res).toEqual(expectedResponse)
});

afterAll((done) => {
    server.close()
    done()
});