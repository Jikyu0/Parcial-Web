// Al cargar la página, verificar si el usuario está logueado
window.onload = function() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        // Si está logueado, mostrar el botón de perfil y ocultar el de login
        document.getElementById('user').style.display = 'block';
        document.getElementById('BotonLogin').style.display = 'none';
        console.log('paso por 1');
    } else {
        // Si no está logueado, mostrar el botón de login
        document.getElementById('BotonLogin').style.display = 'block';
        document.getElementById('user').style.display = 'none';
        console.log('paso por 2');
    }
}

// Función para redirigir a la página de login
function ToLogin() {
    window.location.href = '/Registro_Login.html';
}

// Función para redirigir al perfil
function goToProfile() {
    window.location.href = '/perfil.html';  // Cambia a la URL de tu perfil
}

function logout() {
    // Eliminar el estado de login del localStorage
    localStorage.removeItem('userLoggedIn');
    
    // Redirigir a la página de login
    window.location.href = '/inicio.html';
}
