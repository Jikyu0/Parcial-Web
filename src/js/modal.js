const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const container = document.getElementById('container');

registerButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

loginButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});



function verifyAccount(){
    const email = document.getElementById('EmailA').value;
    const pass = document.getElementById('PassA').value;

    if(email == "Admin@gmail.com" || pass == "1234"){
        localStorage.setItem('userLoggedIn', 'true');
        
        // Redirigir a la página de inicio
        window.location.href = '/inicio.html';
    } else {
        alert("Credenciales incorrectas");
    }
}


function verifyAccountInicio(){
    
    if (localStorage.getItem('userLoggedIn') === 'true') {
        // Si está logueado, mostrar el botón de perfil y ocultar el de login
        
        window.location.href = '/RegistroActividades.html';
    } else {
        // Si no está logueado, mostrar el botón de login
        window.location.href = '/Registro_Login.html';
    }
}