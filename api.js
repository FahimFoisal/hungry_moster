function capturingSearchItem () {
    const searchMenu = document.getElementById('menuItemSearch').value;
    parsingInfo(searchMenu[0]);
    const result = document.getElementById("ingredient");
    result.innerHTML = '';
}

function parsingInfo(searchItem) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`)
    .then (res => res.json())
    .then (data => {
        if (data.meals == null) {
            console.log("menu does not found");
        }
        else {
            // console.log(data.meals[0].strMeal);
            console.log(data.meals);
            creatingSearchResult(data.meals);
        }
    });
}

function creatingSearchResult (arrayItems) {
    const result = document.getElementById("searchResult");
    result.innerHTML = '';
    arrayItems.forEach(item => {
        
        const divBlock = document.createElement('div');
        divBlock.className = 'divBlock';
        const htmlTag = `
        <img src=${item.strMealThumb}>
        <h3>${item.strMeal}</h3>
        `;
        divBlock.innerHTML = htmlTag;
        result.appendChild(divBlock);
        
        
    });
    const clicked = document.getElementById('searchResult');
        clicked.addEventListener('click',function(event) {
            console.log(event.target.getAttribute('src'));
            for (let i = 0; i < arrayItems.length; i++) {
                if (arrayItems[i].strMealThumb == event.target.getAttribute('src') || arrayItems[i].strMeal == event.target.innerText) {
                    const ingredients = document.getElementById("ingredient");
                    ingredients.innerHTML = '';
                    const foodDetails = `
                        <img src=${arrayItems[i].strMealThumb} width='400px'>
                        <h1>${arrayItems[i].strMeal}</h1>
                        <h3>Ingredients</h3>
                    `;
                    ingredients.innerHTML = foodDetails;
                    const ingredientUl = document.createElement('ul');
                    ingredientUl.className = 'ingredientList';
                        const ingredientsItem = `
                            <li>${arrayItems[i].strMeasure1} ${arrayItems[i].strIngredient1}</li>
                            <li>${arrayItems[i].strMeasure2} ${arrayItems[i].strIngredient2}</li>
                            <li>${arrayItems[i].strMeasure3} ${arrayItems[i].strIngredient3}</li>
                            <li>${arrayItems[i].strMeasure4} ${arrayItems[i].strIngredient4}</li>
                            <li>${arrayItems[i].strMeasure5} ${arrayItems[i].strIngredient5}</li>
                            <li>${arrayItems[i].strMeasure6} ${arrayItems[i].strIngredient6}</li>
                        `;
                        ingredientUl.innerHTML = ingredientsItem;
                    ingredients.appendChild(ingredientUl);
                    break; 
                }   
            }
        })
}



