function capturingSearchItem () {
    const searchMenu = document.getElementById('menuItemSearch').value;
    parsingInfo(searchMenu[0]);
    const result = document.getElementById("ingredient");
    result.innerHTML = '';
    const itemNotFound = document.getElementById('notFound');
    itemNotFound.innerHTML = "";
}

function parsingInfo(searchItem) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`)
    .then (res => res.json())
    .then (data => {
        if (data.meals == null) {
            console.log("menu does not found");
            const itemNotFound = document.getElementById('notFound');
            const paragraph =`
                <h2>Menu Not Found</h2>
            `;
            itemNotFound.innerHTML = paragraph;

        }
        else {
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
                const ingredientUl = document.createElement('div');
                ingredientUl.className = 'ingredientList';
                const ingredientsItem = `
                    <p>${arrayItems[i].strMeasure1} ${arrayItems[i].strIngredient1}</p>
                    <p>${arrayItems[i].strMeasure2} ${arrayItems[i].strIngredient2}</p>
                    <p>${arrayItems[i].strMeasure3} ${arrayItems[i].strIngredient3}</p>
                    <p>${arrayItems[i].strMeasure4} ${arrayItems[i].strIngredient4}</p>
                    <p>${arrayItems[i].strMeasure5} ${arrayItems[i].strIngredient5}</p>
                    <p>${arrayItems[i].strMeasure6} ${arrayItems[i].strIngredient6}</p>
                `;
                ingredientUl.innerHTML = ingredientsItem;
                ingredients.appendChild(ingredientUl);
                break; 
            }   
        }
    })
}



