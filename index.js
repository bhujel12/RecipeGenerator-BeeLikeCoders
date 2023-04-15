
const form = document.querySelector('#ingredientForm');
const input = document.querySelector('#ingredientInput');
const addIngredientButton = document.querySelector('#addIngredientButton');
const recipesList = document.querySelector('#recipesList');
const recipeArray = [];
const lis = document.querySelectorAll('li');


recipesList.addEventListener('click', function (e) {
    e.target.remove();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ingredientName = input.value;
    const newIngredient = document.createElement('li');
    newIngredient.innerText = ingredientName;
    recipesList.append(newIngredient);
    input.value = '';
});

// formSubmit.addEventListener('submit', async function (event) {
//     event.preventDefault();
//     const query = input.value;
//     const configuration = { params: { q: query, key: APIKey } }
//     // We could also just use the built in fetch function honestly
//     axios.get(`https://api.spoonacular.com/recipes/complexSearch`, configuration)
//         .then(function (response) {
//             addLocationToScreen(response.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// });

