
const ingredientForm = document.querySelector('#ingredientForm');
const submitForm = document.querySelector('#submitForm');
const input = document.querySelector('#ingredientInput');
const addIngredientButton = document.querySelector('#addIngredientButton');
const recipesList = document.querySelector('#recipesList');
let recipeArray = [];
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
                const img = document.createElement('img');
                img.src = recipe.image;
                document.body.append(img);

                const description = document.createElement('p');
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
}

const removeOldRecipes = () => {
    let images = document.querySelectorAll('img');
    for (var i = 0; i < images.length; i++) {
        images[i].parentNode.removeChild(images[i]);
    }
}



// const makeImages = (shows) => {
//     for (let result of shows) {
//         if (result.show.image) {
//             const img = document.createElement('img');
//             img.src = result.show.image.medium;
//             document.body.append(img)
//         }

//     }
// }


const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    // for if we needed just one or so inputs
    // const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
    // for if we had multiple types of search inputs
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    makeImages(res.data)
    form.elements.query.value = "";

})

