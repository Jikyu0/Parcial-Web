/* Logica cambio tema pagina */
const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
}

const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
}

const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light"?
    temaOscuro():temaClaro();
}

/* Logica cambio tema pagina */

/*Api Comida Requests*/
/*
// API Key de Spoonacular
const apiKey = 'b9fb0c8e2f514e5ea1cf1407ce7e2363'; // Clave del api de la pagina Spoonacular

// Selección de elementos del DOM
const form = document.getElementById('searchForm');
const resultsDiv = document.getElementById('results');

// Manejo del evento "submit" del formulario
form.addEventListener('input', async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  const query = document.getElementById('query').value.trim(); // Obtén el valor del input y elimina espacios
  resultsDiv.innerHTML = '<p>Loading...</p>'; // Muestra un mensaje de carga

  if (!query) {
    resultsDiv.innerHTML = ''; // Mensaje si la consulta está vacía
    return;
  }

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

// Función para mostrar los resultados
function displayResults(foods) {
  resultsDiv.innerHTML = ''; // Limpia los resultados previos

  foods.forEach((food) => {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('food');
    foodDiv.innerHTML = `
      <h3>${food.name}</h3>
      <img src="https://spoonacular.com/cdn/ingredients_100x100/${food.image}" alt="${food.name}" width="100">
      
    `;
    //<p>ID: ${food.id}</p> Este es el id de la comida por si algo
    resultsDiv.appendChild(foodDiv);
  });
}

*/




/*Api Comida Requests*/
/*

const apiKey = 'b9fb0c8e2f514e5ea1cf1407ce7e2363'; // Reemplaza con tu clave

// Selección de elementos del DOM
const input = document.getElementById('query');
const resultsDiv = document.getElementById('results');

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
        const response = await fetch(`https://api.spoonacular.com/food/search?query=${query}&apiKey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json(); // Convierte la respuesta a JSON
        
        // Verifica si hay alimentos en los resultados
        if (data.foods && data.foods.length > 0) {
            displayResults(data.foods); // Muestra los resultados (comidas)
        } else {
            resultsDiv.innerHTML = '<p>No foods found.</p>';
        }
        
    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

// Función para mostrar los resultados
function displayResults(foods) {
    resultsDiv.innerHTML = ''; // Limpia los resultados previos

    foods.forEach((food) => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food');
        foodDiv.innerHTML = `
            <h3>${food.name}</h3>
            <img src="https://spoonacular.com/cdn/ingredients_100x100/${food.image}" alt="${food.name}" width="100">
            <p>ID: ${food.id}</p>
            <p><a href="https://spoonacular.com/food/${food.id}" target="_blank">View Food Details</a></p>
        `;
        resultsDiv.appendChild(foodDiv);
    });
}

*/





