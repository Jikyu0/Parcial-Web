// Selección de elementos
const spaceTracker = document.getElementById('spaceTracker');

// Función para mostrar los trackers
function renderTrackers() {
    spaceTracker.innerHTML = ""; // Limpiar contenedor
    const trackers = JSON.parse(localStorage.getItem('trackers')) || [];
    trackers.forEach((tracker, index) => {
        const trackerDiv = document.createElement('div');
        trackerDiv.className = 'tracker';
        trackerDiv.innerHTML = `
            <div class="backgroundTracker">
            <h3 id="Tracker">Exercise: ${tracker.exercise}</h3>
            <p>How Long?: ${tracker.howTime}</p>
            <p>Wake Up: ${tracker.wakeTime}</p>
            <p>Lie Down: ${tracker.lieTime}</p>
            <button class="delete-button btn btn-danger" data-index="${index}">Delete</button>
            </div>
        `;
        spaceTracker.appendChild(trackerDiv);
    });

    // Asignar eventos a los botones de eliminar
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', deleteTracker);
    });
}

// Función para agregar un tracker
function addTracker() {
    const howTime = document.getElementById('timeInputhow').value;
    const wakeTime = document.getElementById('timeInputwake').value;
    const lieTime = document.getElementById('timeInputlie').value;
    const exerciseSelect = document.getElementById('exercise'); 
    const selectedText = exerciseSelect.options[exerciseSelect.selectedIndex].text;

    if (!howTime || !wakeTime || !lieTime) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const trackerData = {
        exercise: selectedText,
        howTime: howTime,
        wakeTime: wakeTime,
        lieTime: lieTime
    };

    // Obtener datos existentes y agregar el nuevo tracker
    let trackers = JSON.parse(localStorage.getItem('trackers')) || [];
    trackers.push(trackerData);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('trackers', JSON.stringify(trackers));

    // Actualizar la vista
    renderTrackers();
}

// Función para eliminar un tracker
function deleteTracker(event) {
    const index = event.target.getAttribute('data-index');
    let trackers = JSON.parse(localStorage.getItem('trackers')) || [];

    // Eliminar el tracker específico
    trackers.splice(index, 1);

    // Guardar los cambios en localStorage
    localStorage.setItem('trackers', JSON.stringify(trackers));

    // Actualizar la vista
    renderTrackers();
}

// Asignar evento al botón para agregar tracker
document.getElementById('BotonTracker').addEventListener('click', addTracker);

// Cargar trackers al iniciar la página
renderTrackers();