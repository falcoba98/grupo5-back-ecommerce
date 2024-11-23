const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList() {
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="col-12 justify-content-center align-items-center">
              <div class="card mb-3" style="max-width:100%;">
                    <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${category.imgSrc}" class="img-fluid rounded-end" style="object-fit: cover; width: 100%; height: 100%;" alt="${category.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="custom-cardinga-body" style="object-fit: cover; width: 100%; height: 100%; padding: 10px;">
                                    <h5 class="card-title fw-bold category-title">${category.name}</h5>
                                    <p class="card-text fw-bold category-text">${category.description}</p>
                                    <p class="card-text fw-bold category-art text-end">${category.productCount} artículos</p>
                                </div>
                                </div>
                            </div>
                    </div>
            </div>`;
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //mostramos las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            showCategoriesList();
        }
    });

    // Verificar y añadir eventos solo si los elementos existen
    const sortAsc = document.getElementById("sortAsc");
    if (sortAsc) {
        sortAsc.addEventListener("click", function () {
            sortAndShowCategories(ORDER_ASC_BY_NAME);
        });
    }

    const sortDesc = document.getElementById("sortDesc");
    if (sortDesc) {
        sortDesc.addEventListener("click", function () {
            sortAndShowCategories(ORDER_DESC_BY_NAME);
        });
    }

    const sortByCount = document.getElementById("sortByCount");
    if (sortByCount) {
        sortByCount.addEventListener("click", function () {
            sortAndShowCategories(ORDER_BY_PROD_COUNT);
        });
    }

    const clearRangeFilter = document.getElementById("clearRangeFilter");
    if (clearRangeFilter) {
        clearRangeFilter.addEventListener("click", function () {
            const rangeMin = document.getElementById("rangeFilterCountMin");
            const rangeMax = document.getElementById("rangeFilterCountMax");

            if (rangeMin) rangeMin.value = "";
            if (rangeMax) rangeMax.value = "";

            minCount = undefined;
            maxCount = undefined;

            showCategoriesList();
        });
    }

    const rangeFilterCount = document.getElementById("rangeFilterCount");
    if (rangeFilterCount) {
        rangeFilterCount.addEventListener("click", function () {
            const rangeMin = document.getElementById("rangeFilterCountMin");
            const rangeMax = document.getElementById("rangeFilterCountMax");

            minCount = rangeMin && rangeMin.value && parseInt(rangeMin.value) >= 0 ? parseInt(rangeMin.value) : undefined;
            maxCount = rangeMax && rangeMax.value && parseInt(rangeMax.value) >= 0 ? parseInt(rangeMax.value) : undefined;

            showCategoriesList();
        });
    }
});

// Desafiate, cantidad de productos en carrito
function actualizarBadgeCarrito() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById("cartCountBadge").innerText = totalQuantity;
  }
  document.addEventListener("DOMContentLoaded", function() {
    actualizarBadgeCarrito();
  });