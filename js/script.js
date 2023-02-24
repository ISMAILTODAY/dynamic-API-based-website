const loadMeals = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayMeal(data.meals));
}

const displayMeal = meal =>{
    // console.log(meal)
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
     meal.forEach( (meal) => {
        // console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        
        <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top p-3 border-0 shadow" alt="...">
        <div class="card-body">
        <h5 class="card-title pb-3 text-center">${meal.strMeal}</h5>
            
        <!-- Button trigger modal -->
        <button onclick="mealDetails(${meal.idMeal})" type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Details
        </button>
    </div>
     `
    
     mealContainer.appendChild(mealDiv);
     
    });
}

const searchMeal = () =>{
   const searchField =  document.getElementById('search-field').value;
   console.log(searchField)
  if(searchField !== ''){
    loadMeals(searchField)
  }

   document.getElementById('search-field').value = '';
}

const mealDetails = (idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data))
}

const displayDetails = (data) =>{
    // console.log()
    document.getElementById('exampleModalLabel').innerText = data.meals[0].strMeal
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    
    <img class="img-fluid p-2" src="${data.meals[0].strMealThumb}">
    <p>${data.meals[0].strInstructions}</p>
    <a href="${data.meals[0].strYoutube}" target="_blank"><button class="btn btn-primary">YouTube</button></a>
    
    `
}


loadMeals('fish');