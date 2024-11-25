// API Key de Spoonacular
const apiKey = 'b9fb0c8e2f514e5ea1cf1407ce7e2363'; // Clave del API de Spoonacular

// Selección de elementos del DOM
const form = document.getElementById('searchForm');
const resultsDiv = document.getElementById('results');
const input = document.getElementById('query');

// Manejo del evento "input" del campo de búsqueda
input.addEventListener('input', async () => {
    const query = input.value.trim(); // Obtén el valor del input y elimina espacios

    if (!query) {
        resultsDiv.innerHTML = ''; // Limpia los resultados si no hay consulta
        return;
    }

    resultsDiv.innerHTML = '<p>Loading...</p>'; // Muestra un mensaje de carga

    try {
        // Realiza la solicitud a la API para buscar alimentos
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${apiKey}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`); // Proporciona el mensaje de error específico
        }

        const data = await response.json(); // Convierte la respuesta a JSON
        
        // Verifica si hay alimentos en los resultados
        if (data.results && data.results.length > 0) {
            displayResults(data.results); // Muestra los resultados (alimentos)
        } else {
            resultsDiv.innerHTML = '<p>No foods found.</p>';
        }
        
    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
var imgSelect = '';
var imgFood = '';
var foodName= '';
// Función para mostrar los resultados
function displayResults(foods) {
    resultsDiv.innerHTML = ''; // Limpia los resultados previos

    foods.forEach((food) => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food');
        foodDiv.id = 'nombreComida';
        foodDiv.innerHTML = `
            <h3 style="cursor: pointer;" onclick="SelectFood()" id="nameFood">${food.name}</h3>
        `;
        resultsDiv.appendChild(foodDiv);
        imgSelect = `https://spoonacular.com/cdn/ingredients_100x100/${food.image}`;
        foodName=food.name;
    });
}

let botonimage;
let botonAddfood;

let MarcarBoton;

let foodArray = JSON.parse(localStorage.getItem('foodArray')) || [];

function SelectFood(){
    const NComida = document.getElementById('nameFood').textContent;
    //const ImgFood = document.getElementById('imgFood').src;
        
    alert('Deseas cargar este alimento o comida? ('+NComida+').');

    if(botonimage != null){
        botonimage.style.backgroundImage = `url('${imgSelect}')`;
        botonimage.style.backgroundSize = 'cover';
        botonimage.style.backgroundPosition = 'center';
        botonimage.style.backgroundRepeat = 'no-repeat';

        botonAddfood.style.opacity = '40%';
        if (foodName) {
            foodArray.push(foodName); // Agregar el alimento al array
            localStorage.setItem('foodArray', JSON.stringify(foodArray)); // Guardar en localStorage
            
          }
    }else{
        console.log('no eligio ninguno');
    }

    
}

function AddFoodDes(){
    botonimage = document.getElementById('desayuno');
    botonAddfood = document.getElementById('plusFoodDes');
    /*const botonFood = document.getElementById('container_Search');
    botonFood.style.display = 'block';*/
}

function AddFoodAlm(){
    botonimage = document.getElementById('Almuerzo');
    botonAddfood = document.getElementById('plusFoodAlm');
     /*const botonFood = document.getElementById('container_Search');
    botonFood.style.display = 'block';*/
}

function AddFoodCen(){
    botonimage = document.getElementById('Cena');
    botonAddfood = document.getElementById('plusFoodCen');
     /*const botonFood = document.getElementById('container_Search');
    botonFood.style.display = 'block';*/
}