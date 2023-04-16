
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
const APIKey = "b8ebeca9b2c446a98c8592af96af2cde";

submitForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    let recipeUrlInput = "";
    for (let i = 0; i < recipeArray.length; i++) {
        recipeUrlInput += recipeArray[i].toString() + ",+";
    }
    console.log(recipeUrlInput);
    axios.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + recipeUrlInput + "&apiKey=" + APIKey + "&includeNutrition=false.")
        .then(function (response) {
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

            getSummary(recipe.id);

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


const getSummary = (recipeId) => {

    axios.get("https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + APIKey + "&includeNutrition=false.")
        .then(function (response) {
            const summary = document.createElement('p');
            let clean = DOMPurify.sanitize(response.data.summary);
            summary.innerText = clean;
            document.body.append(summary);
            console.log(response.data.summary);
            console.log(clean);
            console.log(recipeId)

        })
        .catch(function (error) {
            console.log(error);
            console.log(recipeId);
        })


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