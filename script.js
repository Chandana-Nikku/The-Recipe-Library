const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const receipeContainer=document.querySelector('.receipeContainer')
const receipeDetailsContent=document.querySelector('.receipe-details-content');
const receipeCloseBtn=document.querySelector('.receipe-close-btn');





const fetch_receipes=async (query)=>{ 
receipeContainer.innerHTML="<h2>Fetching receipes....</h2>";
try {
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
   //console.log(response);
    
    receipeContainer.innerHTML="";
    response.meals.forEach(meal=>{
    const receipeDiv = document.createElement('div');
    receipeDiv.classList.add('receipe');
    receipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span></p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button=document.createElement('button');
    button.textContent="View Receipe";
    receipeDiv.appendChild(button);
    //Adding EventListener to receipe button
    button.addEventListener('click',()=>{
        OpenReceipePopup(meal);
    });
    receipeContainer.appendChild(receipeDiv);
   });
}
catch(error){
    receipeContainer.innerHTML=`<h2>Error in Fetching Receipes...</h2>`;

}
}

/* Function to fetch ingredients and measurements*/
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredient}`;
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
const OpenReceipePopup=(meal)=>{
    receipeDetailsContent.innerHTML=`
    <h2 class="receipeName">${meal.strMeal}</h2>
    <h3><b><u>Ingredients:</u></b></h3>
    
    <ul class="ingredientList" >${fetchIngredients(meal)}</ul>
    <div class="receipeInstructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>

    `
    receipeDetailsContent.parentElement.style.display="block";

}
receipeCloseBtn.addEventListener('click',()=>{
    receipeDetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        receipeContainer.innerHTML=`<h2>Type the meal in the search box..</h2>`;
        return;
    }
    fetch_receipes(searchInput);
    console.log("button clicked")
});

