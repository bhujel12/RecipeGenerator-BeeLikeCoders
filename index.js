
const ingredientForm = document.querySelector('#ingredientForm');
const submitForm = document.querySelector('#submitForm');
const input = document.querySelector('#ingredientInput');
const addIngredientButton = document.querySelector('#addIngredientButton');
const recipesList = document.querySelector('#recipesList');
let recipeArray = [];
let recipeIds = [];
const lis = document.querySelectorAll('li');

recipesList.addEventListener('click', function (e) {
    recipeArray.splice(recipeArray.indexOf(e.target.innerText), 1);
    e.target.remove();
});

ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ingredientName = input.value;
    const newIngredient = document.createElement('li');
    newIngredient.innerText = ingredientName;
    recipesList.append(newIngredient);
    recipeArray.push(ingredientName);
    input.value = '';
});
const APIKey = "f6950064452e44f59f268d1c1f420aa9";

submitForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    let recipeUrlInput = "";
    for (let i = 0; i < recipeArray.length; i++) {
        recipeUrlInput += recipeArray[i].toString() + ",+";
    }
    console.log(recipeUrlInput);
    axios.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + recipeUrlInput + "&apiKey=" + APIKey + "&includeNutrition=true.")
        .then(function (response) {
            console.log(response)
            removeOldRecipes();
            makeRecipes(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
});

const makeRecipes = (recipes) => {
    if (recipes.length > 0) {
        for (let recipe of recipes) {
            if (recipe.title && recipe.image) {

                recipeIds.push(recipe.id);

                const img = document.createElement('img');
                img.src = recipe.image;
                document.body.append(img);

                const description = document.createElement('h5');
                description.innerText = recipe.title;
                document.body.append(description);

                for (let missed of recipe.missedIngredients) {
                    const needed = document.createElement('p');
                    needed.innerText = missed.original;
                    document.body.append(needed);
                }

                for (let unused of recipe.unusedIngredients) {
                    const use = document.createElement('p');
                    use.innerText = unused.original;
                    document.body.append(use);
                }

                for (let used of recipe.usedIngredients) {
                    const have = document.createElement('p');
                    have.innerText = used.original;
                    document.body.append(have);
                }

            }
        }
    } else {
        alert('No Recipes Available With Your Combo Of Ingredients');
    }

    document.body.append(document.createElement('br'));
}



const removeOldRecipes = () => {
    let images = document.querySelectorAll('img');
    for (var i = 0; i < images.length; i++) {
        images[i].parentNode.removeChild(images[i]);
    }
    let h5s = document.querySelectorAll('h5');
    for (var i = 0; i < h5s.length; i++) {
        h5s[i].parentNode.removeChild(h5s[i]);
    }
    let paragraphs = document.querySelectorAll('p');
    for (var i = 1; i < paragraphs.length; i++) {
        paragraphs[i].parentNode.removeChild(paragraphs[i]);
    }
}

//https://api.spoonacular.com/recipes/{id}/information


// submitForm.addEventListener('submit', async function (event) {
//     event.preventDefault();
//     let recipeUrlInput = "";
//     for (let i = 0; i < recipeArray.length; i++) {
//         recipeUrlInput += recipeArray[i].toString() + ",+";
//     }
//     console.log(recipeUrlInput);
//     axios.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + recipeUrlInput + "&apiKey=" + APIKey + "&includeNutrition=true.")
//         .then(function (response) {
//             console.log(response)
//             removeOldRecipes();
//             makeRecipes(response.data)
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// });