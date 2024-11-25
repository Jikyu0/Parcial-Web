
/* funcion guardar datos en local storage de habits */ 

let exercise = "";
let howTime ="";
let wakeTime ="";
let lieTime ="";


let burpiesData = 0;
let plankData = 0;
let squatsData = 0;
let pushUpsData = 0;
let bicepsCurlData = 0;
let lungeData = 0;

let myChartExercise;
let myChartSleep;
let myChartFood;

let sleepDuration;
let decemberData;

let foodData = [];

document.addEventListener('DOMContentLoaded', function() {
  updateChart();
  updateSleep();
  updateFood();
  actualizarGraficas();
});


function saveHabits() {
  
  howTime = document.getElementById('timeInputhow').value;
  wakeTime = document.getElementById('timeInputwake').value;
  lieTime = document.getElementById('timeInputlie').value;
  
  // Asegúrate de que este ID coincida con el del select en HTML
  const exercise = document.getElementById('exercise'); 

  // Obtén el valor y el texto seleccionado
  const exerciseValue = exercise.value;
  const selectedText = exercise.options[exercise.selectedIndex].text;

  console.log('Valor seleccionado:', exerciseValue);
  console.log('Texto seleccionado:', selectedText);

  // Convierte el valor de tiempo a enteros
  const [hourshow, minuteshow] = howTime.split(':').map(Number); // Divide la cadena y convierte a números
  const [hourswake, minuteswake] = wakeTime.split(':').map(Number);
  const [hourslie, minuteslie] = lieTime.split(':').map(Number);


  // Calcula el total de minutos desde medianoche
  const totalMinuteshow = hourshow * 60 + minuteshow;
  const totalMinuteswake = hourswake * 60 + minuteswake;
  const totalMinuteslie = hourslie * 60 + minuteslie;
  console.log(totalMinuteshow);
  console.log(totalMinuteswake);
  console.log(totalMinuteslie);

  // Guardar en local storage
  localStorage.setItem(selectedText, totalMinuteshow);
  localStorage.setItem('totalMinutesWake', totalMinuteswake);
  localStorage.setItem('totalMinutesLie', totalMinuteslie);

  updateChart();
  updateSleep();
  updateFood();
}



// ------------------------------------------ Grafica comida ------------------------///

function updateFoodGraph() {
  

  if (myChartFood) {
    myChartFood.destroy(); // Destruye la gráfica existente para evitar duplicados
  }

  // Recuperar los datos desde localStorage
  const foodArray = JSON.parse(localStorage.getItem('foodArray')) || [];
  
  // Crear un arreglo de datos simulados (puedes ajustar según sea necesario)
  foodData = new Array(foodArray.length).fill(1); // Cantidad predeterminada

  myChartFood.update();
}

updateFoodGraph();

function updateFood(){

  const ctx = document.getElementById('myChart'); // ID del canvas de la gráfica

  // Generar la gráfica
  myChartFood = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: foodArray, // Etiquetas (nombres de las comidas)
      datasets: [{
        label: 'Foods',
        data: foodData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#2E256B', // Color del texto de la leyenda
            font: {
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: 'Foods of the Day',
          color: '#2E256B',
          font: {
            size: 18,
            weight: 'bold'
          }
        }
      }
    }
  });
}



// ------------------------------------------ Grafica sueño ------------------------///

function calcSueño() {
    if (myChartSleep) {
        myChartSleep.destroy(); // Destruye la gráfica existente
    }

    // Asegúrate de que lieTime y wakeTime tengan valores válidos
    if (!lieTime || !wakeTime) {
        console.error("Las horas de acostarse y despertarse deben estar definidas.");
        return; // Salir si no hay horas válidas
    }

    // Convertir las horas a objetos Date
    const start = new Date(`1970-01-01T${lieTime}:00`);
    const end = new Date(`1970-01-01T${wakeTime}:00`);

    // Verificar si la hora final es menor que la hora inicial (cruza medianoche)
    if (end < start) {
        // Agregar 24 horas a la hora final
        end.setDate(end.getDate() + 1);
    }

    // Calcular la diferencia en milisegundos
    const sleepDuration = (end - start) / (1000 * 60 * 60); // Convertir a horas

    localStorage.setItem('December', sleepDuration.toFixed(2)); // Almacenar como cadena con dos decimales

    // Recuperar datos del localStorage
    const storedValue = localStorage.getItem('December');
    const decemberData = storedValue ? parseFloat(storedValue) : 0; // Usar parseFloat para manejar decimales

    console.log('Horas de sueño: ', decemberData);

    // Mostrar el resultado
    document.getElementById('result').textContent = `Horas de sueño: ${sleepDuration.toFixed(2)} horas.`;

    myChartSleep.update();
}


calcSueño();
 
function updateSleep(){
  const ctxSleep = document.getElementById('myChartSleep');

myChartSleep = new Chart(ctxSleep, {
  type: 'line',
  data: {
    labels: ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'Agost', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Sleep',
      data: [12, 5, 8, 6, 10, 5, 7, 8, 6, 7, 5, decemberData],
      borderWidth: 1.5,
      backgroundColor: 'rgba(238, 130, 238, 0.7)',
      tension: 0.5,
      fill: 'start'
    }]
  },
  options: {
    plugins: {
        legend: {
          labels: {
            color: '#2E256B', // Color de las leyendas
            font: {
              size: 10, // Tamaño de fuente de las leyendas
              weight: 'bold' // Peso de la fuente
            }
          }
        },
        title: {
          display: true, // Mostrar título
          text: 'Grafic Sleep', // Texto del título
          color: '#2E256B', // Color del título
          font: {
            size: 15, // Tamaño de fuente del título
            weight: 'bold' // Peso de la fuente
          }
        }
      },
    scales: {
        x: {
            ticks: {
              color: '#2E256B', // Color de las etiquetas en el eje X
              font: {
                size: 9 // Tamaño de las etiquetas
              }
            }
          },
          y: {
            ticks: {
              color: '#2E256B', // Color de las etiquetas en el eje Y
              font: {
                size: 9 // Tamaño de las etiquetas
              }
            },
        beginAtZero: true
      }
    }
  }
});

}



// ------------------------------------------ Grafica ejercicio ------------------------///

function actualizarGraficas(){

  if (myChartExercise) {
    myChartExercise.destroy(); // Destruye la gráfica existente
}
  // Recuperar datos del localStorage
burpiesData = localStorage.getItem('Burpies') ? parseInt(localStorage.getItem('Burpies')) : 0;
plankData = localStorage.getItem('Plank') ? parseInt(localStorage.getItem('Plank')) : 0;
squatsData = localStorage.getItem('Squats') ? parseInt(localStorage.getItem('Squats')) : 0;
pushUpsData = localStorage.getItem('Push-ups') ? parseInt(localStorage.getItem('Push-ups')) : 0;
bicepsCurlData = localStorage.getItem('Biceps curl') ? parseInt(localStorage.getItem('Biceps curl')) : 0;
lungeData = localStorage.getItem('Lunge') ? parseInt(localStorage.getItem('Lunge')) : 0;

  console.log(pushUpsData);

  myChartExercise.data.datasets[0].data[0] = burpiesData;
  myChartExercise.data.datasets[1].data[1] = plankData;
  myChartExercise.data.datasets[2].data[2] = squatsData;
  myChartExercise.data.datasets[3].data[3] = pushUpsData;
  myChartExercise.data.datasets[4].data[4] = bicepsCurlData;
  myChartExercise.data.datasets[5].data[5] = lungeData;

    myChartExercise.update(); // Vuelve a renderizar la gráfica
}

actualizarGraficas();



function updateChart() {
  const ctxExercise = document.getElementById('myChartExercise');
  if (!ctxExercise) {
      console.error("Canvas para la gráfica de ejercicios no encontrado.");
      return;
  }

  myChartExercise = new Chart(ctxExercise, {
      type: 'line',
      data: {
          labels: ['Burpies', 'Plank', 'Squats', 'Push-ups', 'Biceps curl', 'Lunge'],
          datasets: [{
              label: 'Exercise',
              data: [burpiesData, plankData, squatsData, pushUpsData, bicepsCurlData, lungeData],
              borderWidth: 1,
              borderColor: '#2E256D',
              backgroundColor: 'rgba(238, 130, 238, 0.7)',
              tension: 0.4,
              fill: 'start'
          }]
      },
      options: {
          plugins: {
              legend: {
                  labels: {
                      color: '#2E256B',
                      font: {
                          size: 14,
                          weight: 'bold'
                      }
                  }
              },
              title: {
                  display: true,
                  text: 'Exercise Chart',
                  color: '#2E256B',
                  font: {
                      size: 18,
                      weight: 'bold'
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: '#2E256B',
                      font: {
                          size: 12
                      }
                  }
              },
              y: {
                  ticks: {
                      color: '#2E256B',
                      font: {
                          size: 12
                      }
                  },
                  beginAtZero: true
              }
          }
      }
  });
}

