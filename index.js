
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
        })
        .catch(function (error) {
            console.log(error);
        })
});

