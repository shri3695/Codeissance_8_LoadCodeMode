const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0fbba3cd37mshed2e6bf2968953bp14bf02jsnbc6aade2eb71',
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
	}
};

let recipeNameDiv = document.getElementById("recipe-name");
let recipeImage = document.getElementById("recipe-image");
let calorieDiv = document.getElementById("calorie-div");
let cuisineType = document.getElementById("cuisine-type");
let ingredientsList = document.getElementById("ingredients-list");
let recipeUrl = document.getElementById("recipe-url");
let nutrientsDetails = document.getElementById("nutrients-details");

const getRecipe = async (recipe) => {
    let recipeName = recipe
    await fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${recipeName}`, options)
	.then(response => response.json())
	.then(response => {

        console.log(response)
        let recipeDetails = response.hits[0].recipe;
        
        console.log(recipeDetails)

        recipeNameDiv.innerHTML = recipeDetails.label
        recipeImage.src = recipeDetails.image
        calorieDiv.innerHTML = recipeDetails.calories.toFixed(2)
        cuisineType.innerHTML = recipeDetails.cuisineType[0]

        ingredientsList.innerHTML = recipeDetails.ingredientLines.map( (ingredient) => {
            return `
                <li>${ingredient}</li>
            `
        } ).join('\n')


        recipeUrl.href = recipeDetails.url

        let arr = []
        let commonNts = ['Calcium', 'Carbs', 'Carbohydrates (net)', 'Fat', 'Fiber', 'Sugars', 'Protein' ]

        for (let [key, value] of Object.entries(recipeDetails.totalNutrients)) {
            console.log(`${key}: ${value}`);
            if(commonNts.includes(value.label)){
                let tempArr = [value.label, value.quantity, value.unit]
                arr.push(tempArr)
            }
            
          }
        
        // console.log(arr)

        nutrientsDetails.innerHTML = arr.map((data) => {
            return `
                <p>${data[0]} ${data[1].toFixed(2)}${data[2]}</p>
            `
        }).join('')



    })
	.catch(err => {console.error(err)});

}

getRecipe("chicken");

document.getElementById("search-btn").addEventListener("click", function(){

    let recipe = document.getElementById("search-input").value;

    getRecipe(recipe);
})


document.getElementById("search-input").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("search-btn").click();
    }
  });
