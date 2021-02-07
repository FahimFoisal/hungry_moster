function capturingSearchItem () {
    const searchMenu = document.getElementById('menuItemSearch').value;
    parsingInfo(searchMenu[0]);
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
    arrayItems.forEach(item => {
        
        const divBlock = document.createElement('div');
        divBlock.className = 'divBlock';
        const htmlTag = `
        <img src=${item.strMealThumb}>
        <h3>${item.strMeal}</h3>
        `;
        divBlock.innerHTML = htmlTag;
        result.appendChild(divBlock);
        // divBlock.setAttribute("onclick", `menuIngredient(${})`)
        // console.log(item.strMealThumb);

    });
}

// function menuIngredient (arg) {
//     const clickedMenu = document.getElementsByClass('divBlock');
//     clickedMenu.addEventListener('click', function () {

//     })
// }

