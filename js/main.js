const sideWidth = $('.list').innerWidth()
console.log(sideWidth);
let openSide = $('.side').css({ left: `-${sideWidth}px` })

var isShown = false
$('.open .bar-i').on('click', function () {
    if (isShown) {
        $('.side').animate({ left: `-${sideWidth}px` }, 500)
        $('ul').removeClass("slideup")
 $('ul').addClass("initSlideup")
           
        $('.bar-i .barr').removeClass('fa-xmark')
        $('.bar-i .barr').addClass('fa-bars')
        isShown = false

    } else {
        $('.side').animate({ left: '0' }, 500)
        $('.bar-i .barr').removeClass('fa-bars')
        $('.bar-i .barr').addClass('fa-xmark')
     
           $('ul').removeClass("initSlideup")
           $('ul').addClass("slideup")

        isShown = true
    }
})





async function getDetailsOfMeal(mealId, termId) {

    $(".loading").fadeIn(300)
    const mealDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    if (mealDetails.status == 200) {
        var response = await mealDetails.json()
        console.log(response);
        displayDetails(response.meals, `${termId}`)
$(".loading").fadeOut(300)
    }
}

/*****initial Random Meals */
function displayMeal(arr) {
    var cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="image" onclick="getDetailsOfMeal('${arr[i].idMeal}','#rowData')" >
         <img src="${arr[i].strMealThumb}" alt="" class="rounded-md">
         <div class="layer rounded-md flex items-center text-black font-bold text-3xl">
           ${arr[i].strMeal}
        </div>
        </div>
    `
    }
    document.querySelector('#rowData').innerHTML = cartona
}



async function RandomMeals() {
    for (let i = 0; i < 25; i++) {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        if (res.status == 200) {
            var data = await res.json();
            console.log(data.meals);
            displayMeal(data.meals);
        }
    }
    
}
RandomMeals();




function displayDetails(arr, selector) {
    var details = ''
    for (let i = 0; i < arr.length; i++) {
        details += `
    <div class="lg:col-span-1 sm:col-span-2   p-4">
    <img src="${arr[i].strMealThumb}" alt="" class="d-img rounded-md">
    <h2 class="text-3xl text-white">${arr[i].strMeal}</h2>
  </div>

  <div class="lg:col-span-3 sm:col-span-5  p-4  text-white ">
   <h2 class="text-3xl">Instructions</h2>
  <p class="text-lg mb-5">${arr[i].strInstructions}</p>
    <h2 class="mb-3 text-3xl">Area : ${arr[i].strArea}</h2>
    <h2 class="mb-3 text-3xl">Category : ${arr[i].strCategory}</h2>
    <h2 class="mb-3 text-3xl">Recipes :</h2>
 <div class="recipes flex gap-3 text-lg">
  <div class="recipes flex flex-wrap gap-3 text-lg">
        ${(() => {
                let ingredients = '';
                for (let j = 1; j <= 20; j++) {
                    const measure = arr[i][`strMeasure${j}`];
                    const ingredient = arr[i][`strIngredient${j}`];
                    if (ingredient && ingredient.trim() !== '') {
                        ingredients += `
          <div class="recipe-details bg-blue-300 rounded-md p-2">${measure} ${ingredient}</div>
        `;
                    }
                }
                return ingredients;
            })()}
    </div>
  
</div>
    
    <h2 class="text-3xl my-3">Tags :</h2>
    <div class="tags flex gap-3 my-3 text-lg">
         ${arr[i].strTags ? `<div class="recipe-details bg-pink-200 text-red-900 rounded-md p-2">${arr[i].strTags}</div>` : ""}

        
    </div>
    <div class="btn-group text-lg mb-3">
     <a href="${arr[i].strSource}" >  <button  class="text-white bg-green-700 w-20 mx-auto py-2 px-3 rounded-md">Source</button></a>
     <a href="${arr[i].strYoutube}" >  <button  class="text-white bg-red-700  w-20 mx-auto py-2 px-3 rounded-md">Youtube</button></a>

    </div>
    
  </div>
    `
    }

    document.querySelector(`${selector}`).innerHTML = details


}


/***************Display categories************ */
/************categories **** */
if (window.location.pathname.includes("categories.html")) {
    getCategoryName();
}

function displayCategoryName(arr) {
    var category = ''
    for (let i = 0; i < arr.length; i++) {
        category += `
        <div class="image" onclick="getCategorydetails('${arr[i].strCategory}')" >
                    <img src="${arr[i].strCategoryThumb}" alt="" class="rounded-md">
                <div class="layer rounded-md flex flex-col  text-center items-center text-black font-bold text-3xl">
                    ${arr[i].strCategory}
                    <h5 class="font-medium text">${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</h5>

                </div>
                
            </div>
        `
    }
    document.querySelector('#categoryData').innerHTML = category;
}

async function getCategoryName() {
    const categoryName = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    if (categoryName.status == 200) {
        var response = await categoryName.json()
        console.log(response);
        displayCategoryName(response.categories)

    }
}


/******************Display category Details ******/
async function getCategorydetails(term) {
     
    $(".loading").fadeIn(300)
    const categoryDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`);
    if (categoryDetails.status == 200) {
        var data = await categoryDetails.json();
        console.log(data.meals);

        displayMeals(data.meals)
    $(".loading").fadeOut(300)


    }
}
// getCategorydetails('chicken')


function displayMeals(arr) {
    var cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="image" onclick="getDetailsOfMeal('${arr[i].idMeal}','#categoryData')" >
         <img src="${arr[i].strMealThumb}" alt="" class="rounded-md">
         <div class="layer rounded-md flex items-center text-black font-bold text-3xl">
           ${arr[i].strMeal}
        </div>
        </div>
    `
    }
    document.querySelector('#categoryData').innerHTML = cartona
    console.log(cartona);

}



/*********************Display area details********* */
if (window.location.pathname.includes("area.html")) {
    getAreaName();
}

async function getAreaName() {

    $(".loading").fadeIn(300)
    const areaDetails = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    if (areaDetails.status == 200) {
        var data = await areaDetails.json();
        console.log(data.meals);

        displayAreaName(data.meals)

    }
}

function displayAreaName(arr) {
    var cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div onclick="getAreaDetails('${arr[i].strArea}')" class="area text-3xl pt-8 text-white text-center ">
        <i class="i-area fa-solid fa-house-laptop"></i>
         <h2>${arr[i].strArea}</h2>
        </div>
    `
    }
    document.querySelector('#areaData').innerHTML = cartona
    // console.log(cartona);

}


async function getAreaDetails(term) {
    $(".loading").fadeIn(300)
    const areaDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`);
    if (areaDetails.status == 200) {
        var data = await areaDetails.json();
        console.log(data.meals);

        displayAreaMeals(data.meals)
  $(".loading").fadeOut(300)
    }
}

function displayAreaMeals(arr) {
    var cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="image" onclick="getDetailsOfMeal('${arr[i].idMeal}','#areaData')" >
         <img src="${arr[i].strMealThumb}" alt="" class="rounded-md">
         <div class="layer rounded-md flex items-center text-black font-bold text-3xl">
           ${arr[i].strMeal}
        </div>
        </div>
    `
    }
    document.querySelector('#areaData').innerHTML = cartona
    // console.log(cartona);

}



/*********************Display ingred details********* */
if (window.location.pathname.includes("ingredients.html")) {
    getIngredName();
}

async function getIngredName() {
    const ingredDetails = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    if (ingredDetails.status == 200) {
        var data = await ingredDetails.json();
        console.log(data.meals);

        displayIngred(data.meals.slice(0, 20))

    }
}

function displayIngred(arr) {
    var cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
   <div onclick="getIngredDetails('${arr[i].strIngredient}')" class="item flex flex-col text-center text-white ">
      <i class="i-area fa-solid fa-drumstick-bite pt-8"></i>
      <h3 class="text-4xl">${arr[i].strIngredient}</h3>
      <p class="text-lg">${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
    `
    }
    document.querySelector('#ingredData').innerHTML = cartona
    // console.log(cartona);

}


async function getIngredDetails(term) {
    
    $(".loading").fadeIn(300)
    const ingredDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
    if (ingredDetails.status == 200) {
        var data = await ingredDetails.json();
        console.log(data.meals);

        displayIngredMeals(data.meals)
   $(".loading").fadeOut(300)
    }
}

function displayIngredMeals(arr) {
    var cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="image" onclick="getDetailsOfMeal('${arr[i].idMeal}','#ingredData')" >
         <img src="${arr[i].strMealThumb}" alt="" class="rounded-md">
         <div class="layer rounded-md flex items-center text-black font-bold text-3xl">
           ${arr[i].strMeal}
        </div>
        </div>
    `
    }
    document.querySelector('#ingredData').innerHTML = cartona

}





/***********************search***************** */

async function getSearchRes(apiUrl) {
    const search = await fetch(apiUrl);
    if (search.status == 200) {
        var data = await search.json();
        console.log(data.meals);
        displaySearchWord(data.meals);
    }
}


function displaySearchWord(arr) {
    var cartona = ''
    for (let i = 0; i < arr.length; i++) {
        cartona += `
    <div class="image" onclick="getDetailsOfMeal('${arr[i].idMeal}','#search')">
         <img src="${arr[i].strMealThumb}" alt="" class="rounded-md">
         <div class="layer rounded-md flex items-center text-black font-bold text-3xl">
           ${arr[i].strMeal}
        </div>
        </div>
    `
    }
    document.querySelector('#search').innerHTML = cartona
}
$('#word').on('input', function () {
    let value = $('#word').val()
    console.log(value);

    getSearchRes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)

})

$('#letter').on('input', function () {
    if ($('#letter').val().length > 1) {
        alert('you must enter only one letter')
    } else {
        let value = $('#letter').val()
        console.log(value);

        getSearchRes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
    }
})




/***************contact us********** */
function validation(element, msg) {
    var text = element.value;
    var message = document.getElementById(msg);
    var regex = {
        userName: /^[A-Za-z][A-Za-z ]{3,}$/,
        email: /^[\w.-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/,
        phone: /^\+?[0-9]{10,15}$/,
        age: /^[1-9][0-9]*$/,
        password: /^[A-Za-z0-9 _*]{5,}$/,
    };

    if (regex[element.id].test(text)) {
        message.classList.add('hidden');
        return true;
    } else {
        message.classList.remove('hidden');
        return false;
    }
}

var userName = document.getElementById('userName');
var email = document.getElementById('email');
var age = document.getElementById('age');
var phone = document.getElementById('phone');
var password = document.getElementById('password');
var repassword = document.getElementById('repassword');

function checkPasswordMatch() {
    const msg = document.getElementById('msgRePassword');
    const passEqual = password.value.trim() === repassword.value.trim();

    if (!passEqual) {
        msg.classList.remove('hidden');
        return false;
    } else {
        msg.classList.add('hidden');
        return true;
    }
}

function contactUs() {
    var isValid = (
        validation(userName, 'msgName') &&
        validation(email, 'msgEmail') &&
        validation(phone, 'msgPhone') &&
        validation(age, 'msgAge') &&
        validation(password, 'msgPassword') &&
        checkPasswordMatch()
    );

    if (isValid) {
        $('#btn')
            .prop('disabled', false)
            .removeClass('cursor-not-allowed ')
            .addClass('bg-red-800 text-white');
    } else {
        $('#btn')
            .prop('disabled', true)
            .addClass('cursor-not-allowed ')
            .removeClass('bg-red-800 text-white');
    }
}


$('input').on('input', contactUs);


$('#contact').on('submit', function (e) {
    e.preventDefault();
    contactUs();

});




/*******loading */
jQuery(function () {
    $('.loading').fadeOut(2000, function () {
        $('body').css({ overflow: 'auto' })
    })
})

/******refresh */
if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
    window.location.href = "./index.html";
}
